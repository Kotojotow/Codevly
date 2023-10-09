const db = require('../database')
const chatModel = require('../models/message_model')
const Log = require('../models/log_model')
const {ObjectId} = require('mongoose')

const addMessage = async (req,res,next) => {
    try{
        const CollectionName = "chat_" + req.body.email
        const Content = req.body.content
        const Collection = db.mongoose.model(CollectionName, chatModel.MessageSchema,CollectionName)

        let nowyRekord = new Collection({
            content: Content,
            user: true
        })
        
        await nowyRekord.save()
        res.json({ message: `${Content} add to ${CollectionName} ` })
        Log.newLog("New Message",req.body.email,true,"succesfull")
    }
    catch(error){
        res.json({ message: error })
        console.error(error)
        Log.newLog("New Message",req.body.email,false,error)
        
    }
}

const showMessage = async (req,res,next) => {
    try{
        const CollectionName = "chat_" + req.body.email
        const AmountOfMessages = req.body.amount

        const Collection = db.mongoose.model(CollectionName, chatModel.MessageSchema,CollectionName)
        const records = await Collection.find().limit(AmountOfMessages)
        
        res.json({ message: records })
    }
    catch(error){
        res.json({ message: error })
        console.error(error)
        
    }
}

const deleteMessage = async (req,res,next) => {
    try{
    const CollectionName = "chat_" + req.body.email

    const Collection = db.mongoose.model(CollectionName, chatModel.MessageSchema,CollectionName)
    const record = await Collection.findByIdAndRemove(req.body.id)
    if (!record)
        res.json({ message: "couldnt find message" })
    else
        res.json({ message: "Message removed" })
    }
    catch(error){
        res.json({ message: error })
        console.error(error)
    }
}
module.exports ={ addMessage, showMessage, deleteMessage}