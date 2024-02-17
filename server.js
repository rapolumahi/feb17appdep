const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
let app = express();
app.use(cors());

app.use("/upload", express.static("upload"));

let userRouter = require("./router/user");

app.use("/", userRouter);
let connectDB = async () => {
  try {
    await mongoose.connect(process.env.dbPath);

    console.log("connected to db");
  } catch (err) {
    console.log("unable to connect");
  }
};

app.listen(process.env.port, () => {
  console.log("listening to port");
});
connectDB();
