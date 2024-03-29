// models/bankModel.js
const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: { // New field for city
        type: String,
        required: true
    },
    available: {
        type: String,
        default: true
    }
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
