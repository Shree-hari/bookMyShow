const mongoose = require('mongoose');

const dbURL = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    // hj
}

module.exports = connectDB;