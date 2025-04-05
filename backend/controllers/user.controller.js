import Course from '../models/course.model.js';
import Purchase from '../models/purchase.model.js';
import User from '../models/user.model.js'
import Stripe from 'stripe'


// Get User Data
export const getUserData = async (req, res) => {

    try {
        const userId = req.auth.userId;

        const user = await User.findById(userId)
        if(!user) {
            return res.json({success: false, message: 'User Not Found!'})
        }

        res.json({success: true, user});
    } catch (error) {
        res.json({success: false, message: error.message});
        
    }
}

// Users enrolled courses with lecture links

export const userEnrolledCourses = async (req, res) => {

    try {
        const userId = req.auth.userId;
        const userData = await User.findById(userId).populate('enrolledCourses');

        res.json({success: true, enrolledCourse: userData.enrolledCourses})
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }

}

// Purchse course
export const pushseCourse = async (req, res) => {

    try {
        
        const { courseId } = req.body;
        const { origin } = req.headers;

        const userId = req.auth.userId;

        const userData = await User.findById(userId);
        const courseData = await Course.findById(courseId);

        

        if(!userData || !courseData) {
            res.json({success: false, message: 'Data Not Found!'});
        }

        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2),
        }

        const newPurchse = await Purchase.create(purchaseData);

        // Stripe Gateway initialized
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        const currency = process.env.CURRENCY.toLowerCase();

        // Creating line items for stripe

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle,
                },
                unit_amount: Math.floor(newPurchse.amount) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                pusrchaseId: newPurchse._id.toString(),
            }
        })

        res.json({succees: true, session_url: session.url});

    } catch (error) {
        res.json({succees: true, message: error.message});
    }

}