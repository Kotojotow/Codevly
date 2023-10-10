const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth_controller')
const UserController = require('../controllers/user_controller')

router.use(express.urlencoded({ extended: false }))

router.post("/login", AuthController.login)

// router.post('/register', AuthController.register)

router
    .route("/register")
    .post(AuthController.register)

router
    .route("/login")
    .get(AuthController.login)

router
    .route("/user")
    .get(UserController.userGet)
    .put()
    .delete(UserController.userDelete)

module.exports = router

