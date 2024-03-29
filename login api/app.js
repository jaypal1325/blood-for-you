const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authController = require('./controller/usercontroller');


const app = express();

//Middleware
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//     });

app.use(bodyParser.json());

app.post('/register', authController.register);
app.post('/login', authController.login);



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/A-Login', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
