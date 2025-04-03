import express from "express";
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/connectDB.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());


connectDB();

app.get('/', (req, res)=>{
    res.send("I am Root!")
});

app.post('/clerk', express.json(), clerkWebhooks);  // request will be parsed using json method


app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
    
})