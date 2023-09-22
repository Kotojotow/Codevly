const db = require('../database')
const chatModel = require('../models/message_model')

const add_message = async (req,res,next) => {
    try{
        const CollectionName = "chat_" + req.body.email
        const Content = req.body.content
        const Kolekcja = db.mongoose.model(CollectionName, chatModel.MessageSchema,CollectionName)

        let nowyRekord = new Kolekcja({
            content: Content,
            user: true
        })
        
        await nowyRekord.save()
        res.json({ message: `${Content} add to ${CollectionName} ` })
    }
    catch(error){
        res.json({ message: error })
        console.error(error)
        
    }
}



module.exports ={ add_message}