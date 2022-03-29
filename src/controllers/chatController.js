const Chat = require('../model/Chat');

const getAllChats = async (req, res) => {
    const chat = await Chat.find();
    if (!chat) return res.status(204).json({ status: false, message: 'No Chat Found!' });
    res.json({ status: true, data: chat });
}


module.exports = {
    getAllChats
}