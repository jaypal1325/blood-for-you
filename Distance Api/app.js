
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const app = express();

const bankController = require('./controller/usercontroller');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Get all banks
app.get('/banks', bankController.getAllBanks);

// Get banks by city
app.get('/banks/city/:city', bankController.getBanksByCity);

// Create a new bank
app.post('/banks', bankController.createBank);

// Update a bank
// app.get('/banks/:id', bankController.updateBank);

// Delete a bank
// app.delete('/banks/:id', bankController.deleteBank);


// connect to mongodb 
mongoose.connect('mongodb://localhost:27017/Distance' )
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

  
module.exports = app;
