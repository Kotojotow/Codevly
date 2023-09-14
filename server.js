if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const db = require('./database')


const app = express()

//Routes

const indexRouter = require('./routes/index')
const chatRouter = require('./routes/chat')


//Apps

db.runDB()
app.use(express.json());
app.use('/', indexRouter)
app.use('/chat', chatRouter)

app.listen(process.env.APP_PORT || 3000)
// npm run devstart