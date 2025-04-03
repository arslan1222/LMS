import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const payload = JSON.stringify(req.body);
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        // Verify webhook payload
        const evt = whook.verify(payload, headers);

        const { data, type } = evt; // Use verified event data

        switch (type) {
            case 'user.created': {
                if (!data.email_addresses || data.email_addresses.length === 0) {
                    return res.status(400).json({ success: false, message: "Email address is missing." });
                }

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url || "",
                };

                await User.create(userData);
                return res.json({ success: true, message: "User created successfully." });
            }

            case 'user.updated': {
                if (!data.email_addresses || data.email_addresses.length === 0) {
                    return res.status(400).json({ success: false, message: "Email address is missing." });
                }

                const userData = {
                    email: data.email_addresses[0].email,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url || "",
                };

                await User.findByIdAndUpdate(data.id, userData);
                return res.json({ success: true, message: "User updated successfully." });
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true, message: "User deleted successfully." });
            }

            default:
                return res.status(400).json({ success: false, message: "Unknown event type." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
