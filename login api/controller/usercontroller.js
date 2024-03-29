const jwt = require('jsonwebtoken');
const User = require('../model/usermodel');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email ' });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid  password' });
        }
        const token = jwt.sign({ email: user._id }, 'secret_key');
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


