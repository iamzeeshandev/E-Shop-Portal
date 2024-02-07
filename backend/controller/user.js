const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs")

router.post("/create-user", upload.single('file'), async (req, res, next) => {
    console.log(req?.body)
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            const fileName = req.file.filename;
            const filePath = `upload/${fileName}`
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error deleting file" })
                } else {
                    res.json({ message: "File deleting successfully." })
                }
            })
            return next(new ErrorHandler("User already exists", 400));
        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename)

        const user = {
            name,
            email,
            password,
            avatar: fileUrl,
        }

        console.log(user)

        const newUser = await User.create(user);
        res.status(201).json({
            data: newUser,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;