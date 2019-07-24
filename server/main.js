
import express from 'express'
import cors from 'cors'
import bp from 'body-parser'
let server = express()
let PORT = process.env.PORT || 3000
require('./assets/db/db-config')

server.use(express.static(__dirname + '../../client/dist'))

server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

let whitelist = ['http://localhost:8080', 'http://localhost:8081', 'https://wifles.herokuapp.com/']
let corsOptions = {
  origin: function (origin, callback) {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  },
  credentials: true
}
server.use(cors(corsOptions))

// let wiffles = require('./assets/controllers/wiffles')
import wifflesController from './assets/controllers/wiffles'
import commentsController from './assets/controllers/comments'

server.use('/api/wiffles', new wifflesController().router)
let comments = require('./assets/controllers/comments')
server.use('/api/comments', new commentsController().router)

server.use('*', (err, req, res, next) => {
  res.status(err.status || 400).send(err)
})

server.listen(PORT, () => console.log('port is running on', PORT))