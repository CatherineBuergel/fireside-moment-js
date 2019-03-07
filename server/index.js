let express = require('express')
let bp = require('body-parser')
let server = express()
let PORT = 3000
require('./server-assets/db/db-config')

server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))




server.use('*', (err, req, res, next) => {
  res.status(err.status || 400).send(err)
})

server.listen(PORT, () => console.log('port is running on', PORT))