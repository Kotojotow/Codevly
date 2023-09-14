const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const db = require('../database')

const register = async(req, res, next) => {
    try{
        if (!req.body.email)                        { res.json({ message: "ProvideEmail" })
            return
        }
        if (!req.body.password)                     { res.json({ message: "ProvidePassword" })
            return
        }
        if (!validator.isEmail(req.body.email))     { res.json({ message: "EmailWrong" })
            return
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            email: req.body.email,
            password: hashedPassword
        })
        user.save()
        db.createCollection(req.body.email+"_chat")
        res.json({ message: "User added Successfully!" })
    }
    catch(error){
        res.json({ message: error })
        console.error(error)
    }
}

const login = async(req, res, next) => {
    
    if (!req.body.email)        { res.json({ message: "ProvideEmail" })
        return
    }
    if (!req.body.password)     { res.json({ message: "ProvidePassword" })
        return
    }

    try{
        const user = await User.findOne({ email: req.body.email })
        if(!user){ res.json({ message: "NoUserFound" })
        return
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (err) {
                res.json({ error: err })
                return
            }
            if (result) {
                let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
                res.json({
                    message: 'Login Successully!',
                    token
                })
                return
            } else {
                res.json({ message: 'Password does not matched!' })
                return
            }
        })
    }
    catch(error){
        res.json({ "message": error})
    }

}

    // User.findOne({ $or: [{ email: email }] })
    //     .then(user => {
    //         if (user) {
    //             bcrypt.compare(password, user.password, function(err, result) {
    //                 if (err) {
    //                     res.json({ error: err })
    //                 }
    //                 if (result) {
    //                     let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
    //                     res.json({
    //                         message: 'Login Successully!',
    //                         token
    //                     })
    //                 } else {
    //                     res.json({ message: 'Password does not matched!' })
    //                 }
    //             })
    //         } else { res.json({ message: 'No user found!' }) }
    //     })

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

module.exports = { register, login }