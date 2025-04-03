import express from "express";
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/connectDB.js";

const app = express();

app.use(cors());


connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("I am Root!")
})


app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
    
})