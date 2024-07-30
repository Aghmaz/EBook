const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRoute = require("./Routes/authRoutes");
const bookRoutes = require("./Routes/bookRoutes");
// const { mongoURI } = require("./config");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
mongoose
  .connect("mongodb://0.0.0.0:27017/ebookdatabase")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("couldn't connected to mongodb"));

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
