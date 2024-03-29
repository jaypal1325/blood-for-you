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

   const register = mongoose.model("user",userSchema);
module.exports = register;

