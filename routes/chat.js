const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat_controller')

router
    .route("/")
    .post(chatController.add_message)


module.exports = router