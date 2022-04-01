const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password, deviceToken } = req.body;
    if (!email || !password) return res.status(400).json({ status: false, message: 'Email and Password are Required' });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.status(401).json({ status: false, message: 'Email and Password are not Correct' }); //Unauthorized || User Not Found

    // check password with bcrypt
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        //create JWTs
        const accessToken = jwt.sign(
            { 'email': foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '90d' }
        );
        const refreshToken = jwt.sign(
            { 'email': foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '90d' }
        );

        foundUser.refreshToken = refreshToken;
        foundUser.loginToken.push(accessToken);
        foundUser.deviceToken.push(deviceToken);
        const result = await foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }) // in prod add secure: true 
        res.json({ accessToken, status: true });
    }
    else {
        res.status(401).json({ status: false, message: 'Email and Password are not Correct' });;
    }
}

module.exports = { handleLogin };