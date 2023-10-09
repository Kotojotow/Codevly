const Mongoose = require("mongoose")

const removedMessageSchema = new Mongoose.Schema({
    content: {
        type: String,
        default: ""
    },
    user: {
        type: String,
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

module.exports = {removedMessageSchema}