const User = require('../models/user_model')
const Log = require('../models/log_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const db = require('../database')

const register = async(req, res, next) => {
    try{
        const email = req.body.email
        const password = req.body.password
        const Record = await User.findOne({ email: email })

        if (!email){ 
            const mes = "ProvideEmail"
            res.json({ message: mes })
            Log.newLog("register" ,email, false, mes)
            return
        }
        if (!password){ 
            const mes = "ProvidePassword"
            res.json({ message: mes })
            Log.newLog("register" ,email, false, mes)
            return
        }
        if (!validator.isEmail(email)){ 
            const mes = "EmailWrong"
            res.json({ message: mes })
            Log.newLog("register" ,email, false, mes)
            return
        }
        if (Record){
            const mes = "EmailExist"
            res.json({ message: mes })
            Log.newLog("register" ,email, false, mes)
            return
        }

        CollectionName = "chat_" + email
        db.createCollection(CollectionName)
        const hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            email: req.body.email,
            password: hashedPassword,
            chatID: CollectionName,
            DateOfRegister: Date.now()
        })
        user.save()
        Log.newLog("register" ,email, true)
        
        res.json({ message: "User added Successfully!" })
    }
    catch(error){
        res.json({ message: error })
        console.error(error)
        
    }
}

const login = async(req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!req.body.email){ 
        const mes = "ProvideEmail"
        res.json({ message: mes })
        Log.newLog("Login",email, false, mes)
        return
    }
    if (!req.body.password){ 
        const mes = "ProvidePassword"
        res.json({ message: mes })
        Log.newLog("login" ,email, false, mes)
        return
    }

    try{
        const user = await User.findOne({ email: email })

        if(!user){ 
            const mes = "NoUserFound"
            res.json({ message: mes })
            Log.newLog("login" ,email, false, mes)
            return
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if (err) {
                res.json({ error: err })
                return
            }
            
            if (result) {
                const mes = 'Login Successully!'
                Log.newLog("login" ,email, true, mes)
                let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
                res.json({
                    message: mes,
                    token
                })
                return
            } else {
                const mes = 'Password does not matched!'
                Log.newLog("login" ,email, false, mes)
                res.json({ message: mes })
                return
            }
        })
    }
    catch(error){
        res.json({ "message": error})
    }

}


module.exports = { register, login }