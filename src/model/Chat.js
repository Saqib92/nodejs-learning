const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true,
    },
    isFile:{
        type: Boolean,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema)