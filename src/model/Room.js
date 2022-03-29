const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    users: {
        type: Array,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Room', roomSchema)