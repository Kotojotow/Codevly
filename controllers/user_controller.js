const { response } = require('express')
const User = require('../models/user_model')

const index = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error occured"
            })
        })
}

const show = (req, res, next) => {
    let userid = req.body.userid
    User.FindById(userid)
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: "An error occured" })
        })
}

const new_user = (req, res, next) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
        .then(response => {
            res.json({ message: 'User Added Successfully!' })
        })
        .catch(error => {
            res.json({ message: "An error occured" })
        })
}

const destroy = (req, res, next) => {
    let userID = req.body.userID
    User.findOneAndRemove(userID)
        .then(response => {
            res.json({ message: 'User Deleted Successfully!' })
        })
        .catch(error => {
            res.json({ message: "An error occured" })
        })
}

module.exports = { index, new_user, show, destroy }