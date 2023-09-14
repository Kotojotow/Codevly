const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth_controller')

router.use(express.urlencoded({ extended: false }))

router.post("/login", AuthController.login)

// router.post('/register', AuthController.register)

router
    .route("/register")
    .get((req,res ) => {
        res.json({message:"get register"})
    })
    .post(AuthController.register)

router
    .route("/login")
    .get(AuthController.login)

module.exports = router