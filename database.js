const mongoose = require('mongoose')
const db = mongoose.connection

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

module.exports = {createCollection,runDB,mongoose}