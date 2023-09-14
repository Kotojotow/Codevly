const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")

const LogSchema = new Mongoose.Schema({
    EventType:{
        type: String,
        default: "UnknownLog"
    },
    EventTime:{
        type: Date
    },
    User:{
        type: String,
        default: "UnknownUser/system"
    },
    Succeed:{
        type: Boolean
    },
    Reason:{
        type: String,
        default: "None"
    }
})

const Log = mongoose.model('Logs', LogSchema)

const newLog = (EventType, User, Succeed = false, Reason) =>{
    let IfSucceed = () =>{
        if(Succeed){return "Succeed"}
        else{return Reason}
    }

    let IfNoUser = () =>{
        if(User){return User}
        else{return "UnknownUser/system"}
    }

    let log = new Log({
        EventType: EventType,
        EventTime: Date.now(),
        User: IfNoUser(),
        Succeed:Succeed,
        Reason: IfSucceed()
    })
    log.save()
}

module.exports = {Log, newLog }