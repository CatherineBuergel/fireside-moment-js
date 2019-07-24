import mongoose from 'mongoose'
import Comment from './Comment.js'

let Schema = mongoose.Schema
let name = 'Wiffle'

let schema = new Schema({
    creator: { type: String, required: true, default: 'Anon' },
    content: { type: String, required: true }
}, {
        timestamps: true
    })

schema.pre('findOneAndRemove', function (next) {
    let wId = this._conditions._id
    Promise.all(
        [
            Comment.deleteMany({ wiffleId: wId })
        ])
        .then(() => next())
        .catch(err => next(err))

})

export default mongoose.model(name, schema)