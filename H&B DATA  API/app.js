const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const userController = require('./controller/usercontroller.js');

const app = express();

// Middleware
app.use(bodyParser.json());

// Multer configuration

var storage = multer.diskStorage({
  destination: function (req, res, cb){
    cb (null, 'uploads/image')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


// Routes
app.post('/register',  upload.fields([{ name: 'authorigetion' }, { name: 'logo' }]), userController.register);

// Connect to MongoDB
mongoose.connect('mongodb+srv://vagadiyachirag9999:dg4SciXxg2N9Nbwf@cluster0.qz9aab3.mongodb.net/blood-for-you', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

  
module.exports = app;

