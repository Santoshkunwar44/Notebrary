const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// using the Middlewares
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: "hello" });
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to Database"))
  .catch((err) => console.log(err));

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

app.listen(8000, () => console.log("server started"));
