const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat_controller')

router
    .route("/")
    .get((req,res ) => {
        res.json({message:"get register"})
    })


module.exports = router