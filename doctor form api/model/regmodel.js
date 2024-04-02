var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    hospitalname:{
        type:String
    },
    Doctername:{
        type:String
    },
    Patientname:{
        type:String
    }, 
    contact:{
        type:Number
    },
    Bloodtype:{
        type:String
    },
   
    // email:{
    //     type:String
    // },
    // password:{
    //     type:String
    // },
    description:{
        type:String
    }
});

   const register = mongoose.model("doctor form",userSchema);
module.exports = register;

