
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  logo: String,
  name: String,
  address: String,
  contact: Number,
  email: { type: String, required: true, unique: true },
  authorigetion: String, // Store the path to the uploaded image

});

const User = mongoose.model('DATA', userSchema);

module.exports = User;
