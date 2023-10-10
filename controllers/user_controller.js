const { response } = require('express')
const User = require('../models/user_model')
const Log = require('../models/log_model')

const userGet = async (req,res,next)    => {
    try{
        const records = await User.find({},{password: 0,_id: 0,__v: 0})
        res.json({message: records})
        Log.newLog("GetAllUsersData",req.body.email,true)
    }
    catch(error){
        console.error(error)
        res.json({message: error})
        Log.newLog("GetAllUsersData",req.body.email,false,error)
    }
}
// const userPut = async (req,res,next) => {
//     try{
//         const email = req.body.email
//         const Record = await User.findOneAndUpdate({ email: email},{})
//     }
//     catch(error){
//         console.error(error)
//         res.json({message: error})
//         Log.newLog("UserChangeData",req.body.email,false,error)
//     }
// }
const userDelete = async (req,res,next) => {
    try{
        const email = req.body.email
        const Record = await User.findOneAndRemove({ email: email})
        Log.newLog("UserDelete",req.body.email,true)
    }
    catch(error){
        console.error(error)
        res.json({message: error})
        Log.newLog("UserDelete",req.body.email,false,error)
    }
}
module.exports = { userGet, userDelete }