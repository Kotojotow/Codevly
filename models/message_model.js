const Mongoose = require("mongoose")

const MessageSchema = new Mongoose.Schema({
    content: {
        type: String
    },
    user: {
        type: Boolean
    }
})

module.exports = {MessageSchema}