if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

//Routes

const indexRouter = require('./routes/index')

//DataBase

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to DataBase'))

//Apps

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)






// npm run devstart