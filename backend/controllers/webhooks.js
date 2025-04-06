import { Webhook } from "svix";
import User from "../models/user.model.js";
import Stripe from "stripe";
import Purchase from "../models/purchase.model.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = await whook.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });

    const { data, type } = req.body;

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        return res.json({ success: true, message: "User created" });
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.json({ success: true, message: "User updated" });
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true, message: "User deleted" });
      }

      default:
        return res.json({ success: true, message: "Unhandled event type" });
    }

  } catch (error) {
    console.error("Webhook Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
  // Match the raw body to content type application/json
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const paymentIntendId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntendId
      });

      const { purchaseId } = session.data[0].metadata;

      // Purchase Data
      const purchaseData = await Purchase.findById(purchaseId);

      // User Data
      const userData = await User.findById(purchaseData.userId);
      
      // Course Data
      const courseData = await Course.findById(purchaseData.courseId.toString());


      courseData.enrolledStudents.push(userData);
      await courseData.save();

      userData.enrolledCourses.push(courseData._id);
      await userData.save();

      purchaseData.status = 'completed'
      console.log(purchaseData.status);
      
      await purchaseData.save();

      break;
    }
      
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      const paymentIntendId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntendId
      });

      const { purchaseId } = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId);

      purchaseData.status = "Failed";
      await purchaseData.save();

      break;
    }
      
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  // Return a response to acknowledge receipt of the event
  response.json({received: true});

}