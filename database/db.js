const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(`Error occurred while connecting to the database: ${error}`);
    }
}

module.exports = connect;