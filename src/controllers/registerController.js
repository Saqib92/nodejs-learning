const User = require('../model/User');
const bcrypt = require('bcrypt');

const handelNewUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ status: false, message: 'Full Name, Username and Password are Required' });
    //check for duplicate username
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.status(409).json({ status: false, message: 'Email Already Teken'});

    try {
        //password encrypt
        const hashPassword = await bcrypt.hash(password, 10);
        //Create and store new user
        const result = await User.create({
            fullName: fullName,
            email: email,
            password: hashPassword
        });
        res.status(201).json({ status: true, message: 'User Signup Successfull!' });
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
}

module.exports = { handelNewUser }