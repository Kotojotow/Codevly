const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth_controller')

router.use(express.urlencoded({ extended: false }))

router.get('/', (req, res) => {
    res.render('index')
})

router.post("/login", AuthController.login)
module.exports = router