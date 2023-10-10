const db = require('../database')
const chatModel = require('../models/message_model')
const removedChat = require('../models/removed_message_model')
const Log = require('../models/log_model')

const addMessage = async (req,res,next) => {
    try{
        const CollectionName = "chat_" + req.body.email
        const Content = req.body.content
        const Collection = db.mongoose.model(CollectionName, chatModel.MessageSchema,CollectionName)

        let nowyRekord = new Collection({
            content: Content,
            user: true,
            date: Date.now()
        })
        
        await nowyRekord.save()
        res.json({ message: `${Content} add to ${CollectionName} ` })
        Log.newLog("New Message",req.body.email,true,nowyRekord.content)
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
        Log.newLog("EnterToChat",req.body.email,true)
    }
    catch(error){
        res.json({ message: error })
        console.error(error)
        Log.newLog("EnterToChat",req.body.email,false,error)       
    }
}

const deleteMessage = async (req,res,next) => {
    try{
    const CollectionName = "chat_" + req.body.email

    const Collection = db.mongoose.model(CollectionName, chatModel.MessageSchema,CollectionName)
    const record1 = await Collection.findById(req.body.id)
    const record = await Collection.findByIdAndRemove(req.body.id)
    if (!record)
        res.json({ message: "couldnt find message" })
    else{
        res.json({ message: "Message removed" })
        const Collection1 = db.mongoose.model("removedMessages", removedChat.removedMessageSchema,"removedMessages")
        let nowyRekord = new Collection1({
            content: record1.content,
            user: req.body.email,
            date: record1.date,
            image: record1.Image
        })
        await nowyRekord.save()
        Log.newLog("MessageDelete",req.body.email,true,record1.content)
    }
    }
    catch(error){
        res.json({ message: error })
        console.error(error)
        Log.newLog("MessageDelete",req.body.email,false,error)

    }
}
module.exports ={ addMessage, showMessage, deleteMessage}