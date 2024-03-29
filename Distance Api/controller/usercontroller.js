// controllers/bankController.js
const Bank = require('../model/usermodel');

// Create a new bank

exports.createBank = async (req, res) => {
    console.log(req.body)
    const bank = new Bank({
        name: req.body.name,
        logo: req.body.logo,
        distance: req.body.distance,
        address: req.body.address,
        city: req.body.city,
        available: req.body.available 
    });
   
    try {
        const newBank = await bank.save();
        res.status(201).json(newBank);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all banks
exports.getAllBanks = async (req, res) => {
    try {
        const banks = await Bank.find();
        res.json(banks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get banks by city
exports.getBanksByCity = async (req, res) => {
    const city = req.params.city;
    try {
        const banks = await Bank.find({ city: city });
        if (banks.length === 0) {
            res.status(404).json({ message: 'No banks found in this city' });
        } else {
            res.json(banks);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Other CRUD operations remain unchanged
