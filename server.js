const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const customEnv = require("custom-env");

const newLocal = customEnv.env(process.env.NODE_ENV, "./config");
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, process.env.STATIC_PATH)));
app.use("/tasks", require("./routers/tasksRouter"));
app.listen(process.env.PORT, () =>
  console.log(`sever is listening to port ${process.env.PORT}`)
);
