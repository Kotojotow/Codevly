const mongoose = require('mongoose')
const db = mongoose.connection
const cron = require('node-cron')
const Log = require('./models/log_model')
const { exec } = require('child_process')

const path = require('path');
const fs = require('fs')

function runDB() {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected to DataBase'))
}

async function createCollection(collectionName) {
    try {
      const result = await db.createCollection(collectionName);
      console.log(`Utworzono nową kolekcję: ${result.collectionName}`);
    } catch (error) {
      console.error('Błąd podczas tworzenia kolekcji:', error);
    }
  }
  
cron.schedule('0 23 * * *', () => {
    const currentDate = new Date()
    const dayOfMonth = currentDate.getDate()
    const backupDirectory = path.join(__dirname, 'backup/'+dayOfMonth)
    if (!fs.existsSync(backupDirectory)) {
      fs.mkdirSync(backupDirectory)
    }
    console.log('Rozpoczęcie codziennego backupu o 23:00')
    exec(`mongodump --out ${backupDirectory}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Błąd: ${error}`)
        Log.newLog("DB Backup","System", false, error)
      } else {
        console.log(`Backup zakończony: ${stdout}`)
        Log.newLog("DB Backup","System", true,backupDirectory)
      }
    })
  })

module.exports = {createCollection,runDB,mongoose}