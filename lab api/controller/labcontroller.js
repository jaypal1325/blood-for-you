const updatecart = async (req, res) => {

    var id = req.params.id; 

    var data = await cart.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        status: 'success',
        data
    })
};