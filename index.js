const express = require("express");
const app=express();
const mongoose = require("mongoose");
const cors=require('cors');
const morgan = require("morgan")
const helmet = require("helmet");
const Userrouter =require("./routes/user")
const Postrouter =require("./routes/post")
app.use(cors());
const database = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://nikhilanand2432:JIfWa3CLGhEbHohb@cluster0.lhbpuwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
};
  database();
app.use(express.json());
app.use(helmet());
app.use('/api', Userrouter);
app.use('/api', Postrouter);
app.use(morgan("common"));
  app.listen(8100,()=>{
    console.log("ready");
})