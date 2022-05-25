const User = require('../model/User');

const getUserByToken = async (req, res) => {
    const cookies = req.headers.authorization.split(' ')[1];
    const Token = cookies;
    const foundUser = await User.findOne({ loginToken: Token }).exec();
    if (!foundUser) return res.status(401).json({ status: false, message: 'Unauthorized' }); //Unauthorized || User Not Found
    let myUser = {
        email: foundUser.email,
        fullName: foundUser.fullName,
        coins: foundUser.coins,
        _id: foundUser._id
    }
    res.json({ status: true, data: myUser });
}

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ message: 'No Users Found!' });
    let fUser = [];
    users.map((val) => {
        fUser.push({
            email: val.email,
            fullName: val.fullName,
            _id: val._id
        })
    })
    res.json({ status: true, data: fUser });
}

module.exports = {
    getUserByToken,
    getAllUsers
};