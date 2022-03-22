const User = require('../model/User');

const handleLogout = async (req, res) => {
    //on client also delete the accesstoken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    // is refresh token in DB?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, });
        return res.sendStatus(403); //Unauthorized || User Not Found
    }

    //Delete TOken from DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, });
    res.sendStatus(204);

}

module.exports = { handleLogout };