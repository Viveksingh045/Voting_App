const mongoose = require('mongoose')
require('dotenv').config();


const mongoURL = process.env.DB_URL_LOCAL; // Use local MongoDB for development
//const mongoURL = process.env.DB_URL; // Use cloud MongoDB for production

// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connected successfully");
});

db.on('error', () => {
    console.error("MongoDB connection error");
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});


module.exports = db;