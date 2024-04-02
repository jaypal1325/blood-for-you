const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const  mongoose  = require('mongoose');

var {addBloodtyp,update} = require('./controller/labcontroller');

app.use(bodyParser.urlencoded({extended: false, limit: '100mb'}));
app.use(bodyParser.json({limit: '100mb'}));



app.get('/addBloodtyp',addBloodtyp);
app.get('/update/:id',update);


mongoose.connect('mongodb+srv://vagadiyachirag9999:dg4SciXxg2N9Nbwf@cluster0.qz9aab3.mongodb.net/blood-for-you' )
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

  
module.exports = app;
