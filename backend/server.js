const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//bring routes

const blogRoutes = require("./routes/blog.routes");
const authenticationRoutes = require("./routes/authentication.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes.js");
const tagRoutes = require("./routes/tags.routes.js");

//app
const app = express();

//db
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

// middlewares

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(cookieParser());

// cors

if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes
app.use("/api", blogRoutes);
app.use("/api", authenticationRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", tagRoutes);

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
