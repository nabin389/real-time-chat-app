// method -1 
// const express = require('express');
// or method - 2
// import express from "express" for this you have to type "module"
// like this
//   "type": "module",  before this there was commonjs
// server.js





import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"


dotenv.config({});
const app = express()
const port = process.env.PORT || 3000;


// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))

//middleware
app.use(express.urlencoded({extended:true})); //not needed
app.use(express.json());
app.use(cookieParser());

// access to uploads folder
app.use("/uploads", express.static("uploads"))

app.use(cors({
  origin: "https://realtimemessage-git-main-nabin389s-projects.vercel.app",
  credentials: true
}));

app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(port, () => {
    connectDB();
  console.log(`Example app listening on port ${port}`)
})

