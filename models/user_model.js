const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")

const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    chatID:{
        type: String,
        require: true
    },
    DateOfRegister:{
        type: Date
    },
    AdminFlag:{
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User