import express from 'express'
import Wiffle from '../services/Wiffle'

export default class wiffleController {
    constructor() {
        this.router = express.Router()
            .post('', this.create)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .put('/:id', this.put)
            .delete('/:id', this.delete)
    }
    async create(req, res, next) {
        try {
            let wiffle = await Wiffle.create(req.body)
            res.send(wiffle)
        }
        catch (err) { next(err) }
    }
    async getAll(req, res, next) {
        try {
            let wiffle = await Wiffle.find({})
            res.send(wiffle)
        }
        catch (err) { next(err) }
    }

    async getById(req, res, next) {
        try {
            let wiffle = await Wiffle.findById(req.params.id)
            res.send(wiffle)
        }
        catch (err) { next(err) }
    }
    async put(req, res, next) {
        try {
            let wiffle = await Wiffle.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.send(wiffle)
        }
        catch (err) { next(err) }
    }

    async delete(req, res, next) {
        try {
            await Wiffle.findOneAndRemove({ _id: req.params.id })
            res.send("succesfully deleted!")
        }
        catch (err) { next(err) }
    }

}


