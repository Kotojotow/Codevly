const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async(req, res, next) => {

        console.log(req.body.email)
        if (!req.body.email){ res.json({ message: "Provide_email" })
            return
        }
        if (!req.body.password){ res.json({ message: "Provide_password" })
            return
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            email: req.body.email,
            password: hashedPassword
        })
        user.save()
        res.json({ message: "User added Successfully!" })


}

// const register = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
//         if (err) {
//             res.json({ error: err })
//         }
//         let user = new User({
//             email: req.body.email,
//             password: hashedPass
//         })
//         user.save()
//             .then(user => {
//                 res.json({ message: "User added Successfully!" })
//             })
//             .catch(error => {
//                 res.json({ message: "An error occured" })
//             })
//     })
// }

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({ $or: [{ email: email }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        res.json({ error: err })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            message: 'Login Successully!',
                            token
                        })
                    } else {
                        res.json({ message: 'Password does not matched!' })
                    }
                })
            } else { res.json({ message: 'No user found!' }) }
        })
}


module.exports = { register, login }