const mongoose = require("mongoose");

const connectDatabase =async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {})
            .then((data) => {
                console.log(`mongodb connected with server: ${data.connection.host}`);
            });;
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};

module.exports = connectDatabase;