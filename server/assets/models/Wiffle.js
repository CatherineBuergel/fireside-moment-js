let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = 'Wiffle'

let schema = new Schema({
    creator: {type: String, required: true, default: 'Anon'},
    content: {type: String, required: true}
}, {
    timestamps: true
})

module.exports = mongoose.model(name, schema)