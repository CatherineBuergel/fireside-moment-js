import mongoose from 'mongoose'
let Schema = mongoose.Schema

let schema = new Schema({
    creator: { type: String, required: true, default: 'Anon' },
    content: { type: String, required: true, enum: ["Nice Nice", "mHmmm", "Alright, Thanks"], default: "mHmmm" },
    wiffleId: { type: Schema.Types.ObjectId, ref: 'Wiffle', required: true }
}, {
        timestamps: true
    })

export default mongoose.model('Comment', schema)