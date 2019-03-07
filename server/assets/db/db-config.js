const mongoose = require('mongoose')
const connectionString = "mongodb://porter:forSammy14@ds052819.mlab.com:52819/sams-class"
const connection = mongoose.connection

mongoose.connect(connectionString, { useNewUrlParser: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})