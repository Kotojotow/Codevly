const Mongoose = require("mongoose")

const MessageSchema = new Mongoose.Schema({
    content: {
        type: String,
        default: ""
    },
    user: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date
    },
    Image: {
        type: String,
        default: undefined
    }
})

module.exports = {MessageSchema}