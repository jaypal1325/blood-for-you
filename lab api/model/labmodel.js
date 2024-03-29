const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({

  bloodGroup:{
    type:String,
  },
  
  Quantity:{
    type:Number,
  },
    
  });

const lab = mongoose.model('update', labSchema);
 
module.exports = lab;