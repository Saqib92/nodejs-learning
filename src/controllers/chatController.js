const Chat = require('../model/Chat');
const Room = require('../model/Room');

const getAllChats = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: 'ID Parameter Required' })
    }
    const chat = await Chat.find({ roomId: req.params.id }).exec();
    if (!chat) return res.status(204).json({ status: false, message: 'No Chat Found!' });
    res.json({ status: true, data: chat });
}

const createRoom = async (req, res) => {
    const userIds = [req.body.userOne, req.body.userTwo];
    const foundRoom = await Room.find({ users: { $all: userIds } }).exec();
    if (foundRoom.length <= 0) {
        try {
            const result = await Room.create({
                users: userIds
            })
            return res.json({ status: true, message: 'Room Created', data: { _id: result._id } });
        } catch (err) {
            console.error(err)
        }
    }
    res.json({ status: true, data: { _id: foundRoom[0]._id } });
}

module.exports = {
    getAllChats,
    createRoom
}