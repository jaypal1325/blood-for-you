var register = require('../model/regmodel');



exports.insert =async(req,res) => {

    req.body.description = req.file.originalname;

    var data = await register.create(req.body);

    res.status(200).json({
        status:"data insert",
        data
    })
}

exports.get_data = async(req,res) => {

    var data = await register.create(req.body);

    res.status(200).json({
        status:"data select",
        data
    })
}   

// exports.register_data = async(req,res) => {

//     req.body.description = req.file.originalname;


//     var data = await register.create(req.body);

//     res.status(200).json({
//         status:"data select",
//         data
//     })
// }
/* */

exports.delete_data = async(req,res) => {

    var id = req.params.id;

    var data = await register.findByIdAndDelete(id);

    res.status(200).json({
        status:"data deleted"
    })
}

exports.update_data = async(req,res) => {

    var id = req.params.id;

    var data = await register.findByIdAndUpdate(id,req.body);

    res.status(200).json({
        status:"data updated"
    })
}

// exports.login = async(req,res) => {
//     var data = await register.find({"email":req.body.email});

//     if(reg_status==0)
//     {
//         if(data.length==1)
//         {
//             if(data[0].password==req.body.password)
//             {
//                 reg_status=1;
//                 res.status(200).json({
//                     status:"Login sucess"
//                 })
//             }
//             else
//             {
//                 res.status(200).json({
//                     status:"check your email and password"
//                 })
//             }
//         }
//         else
//         {
//             res.status(200).json({
//                 status:"check your email and password"
//             })
//         }
//     }
//     else
//     {
//         res.status(200).json({
//             status:"user is already login"
//         })
//     }
// }

// exports.logout = async (req,res) => {
//     reg_status=0;
//     res.status(200).json({
//         status:"user logout"
//     })
// }