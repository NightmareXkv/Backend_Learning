const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully");
    } catch (err) {
        console.error("DataBase Connection Error: ", err);
    }
}

module.exports = connectDB;