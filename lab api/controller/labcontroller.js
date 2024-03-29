const cart = require('../model/labmodel');

const addBloodtyp = async (req,res) => {

    var data = await cart.create(req.body)
    console.log(req.body.data);
    res.status(200).json({
        status: 'success',
        data
    })
};
const update = async (req, res) => {

    var id = req.params.id; 

    var data = await cart.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        status: 'success',
        data
    })
};
module.exports = {addBloodtyp,update}
