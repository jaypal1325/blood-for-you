const User = require('../model/usermodel.js');

exports.register = async (req, res) => {
  try {
    const { email, name, address, contact} = req.body;
    const authorigetion = req.files['authorigetion'] ? req.files['authorigetion'][0].path : null;
    const logo = req.files['logo'] ? req.files['logo'][0].path : null;
    const user = new User({ email, name, address, contact, authorigetion, logo});
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
