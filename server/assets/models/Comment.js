let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = 'Comment'

let schema = new Schema({
    creator: {type: String, required: true, default: 'Anon'},
    content: {type: String, required: true, enum: ["Nice Nice", "mHmmm", "Alright, Thanks"], default: "mHmmm"},
    wiffleId: { type: Schema.Types.ObjectId, ref: 'Wiffle', required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model(name, schema)