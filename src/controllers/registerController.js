const User = require('../model/User');
const bcrypt = require('bcrypt');

const handelNewUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and Password are Required' });
    //check for duplicate username
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409);

    try {
        //password encrypt
        const hashPassword = await bcrypt.hash(password, 10);
        //Create and store new user
        const result = await User.create({
            email: email,
            password: hashPassword
        });
        res.status(201).json({ 'message': 'user created successfully' });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handelNewUser }