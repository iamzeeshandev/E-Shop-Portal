const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use("/", express.static("upload"))
app.use(bodyParser.urlencoded({ extended: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}

// Import routes
const user = require("./controller/user")
app.use("/api/v2/user", user);

app.get("/api/create-checkout-session", async (req, res) => {
    console.log("object");
    res.status(200).json({ message: `${process.env.PORT} server running...` })
})

// It's for Error Handling
app.use(ErrorHandler);
module.exports = app;