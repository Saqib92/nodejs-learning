const User = require('../model/User');

const getRewardData = async (req, res) => {
    const foundUser = await User.findOne({ _id: req.query.user_id }).exec();
    if (!foundUser) {
        return res.status(204).json({ message: `No User Found with Id ${req.query.id}` })
    }
    foundUser.coins += 5;
    const result = await foundUser.save();
    res.json({ status: true, message: "Data Saved Successfully"});
    // now for Testing
}

module.exports = {
    getRewardData
}