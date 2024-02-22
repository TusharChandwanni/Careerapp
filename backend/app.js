const express=require("express");
const app=express();
const cookieParser=require("cookie-parser")
const cors = require('cors')
const bodyParser=require("body-parser");
const fileupload=require("express-fileupload");
const dotenv=require("dotenv");

dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "500mb",
  })
);
app.use(fileupload());
app.use(cors());
//route imports

const user=require("./routes/userroute");
const jobRouter = require('./routes/jobroute');
const productRouter = require('./routes/productroute')

const chat = require("./routes/chatRoute");
const message = require("./routes/messageRoute");




app.use(user);
app.use(jobRouter);
app.use(productRouter);
app.use("/chat", chat);
app.use("/:id/message", message);

module.exports = app;
