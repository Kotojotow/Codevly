const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth_controller')
const UserController = require('../controllers/user_controller')

router.use(express.urlencoded({ extended: false }))

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', (req, res) => {
    req.body.email
})

router.post('/new_user', AuthController.register)

module.exports = router