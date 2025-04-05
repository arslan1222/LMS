import express from "express";
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/connectDB.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educator.route.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./config/cloudinary.js";
import courseRouter from "./routes/course.route.js";
import userRouter from "./routes/user.router.js";
const app = express();

const PORT = process.env.PORT || 3000;

connectDB();
await connectCloudinary();

app.get('/', (req, res)=>{
    res.send("I am Root!")
});

// Middelwares
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());


// Routes
app.post('/clerk', clerkWebhooks);  // request will be parsed using json method
app.use('/api/educator',  educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', userRouter);
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);


app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
    
})