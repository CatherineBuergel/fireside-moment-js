// let router = require('express').Router()
// let Comment = require('../services/Comment')

import express from 'express'
import Comment from '../services/Comment'

export default class commentController {
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
            let comment = await Comment.create(req.body)
            res.send(comment)
        }
        catch (err) { next(err) }
    }
    async getAll(req, res, next) {
        try {
            let comment = await Comment.find({})
            res.send(comment)
        }
        catch (err) { next(err) }
    }

    async getById(req, res, next) {
        try {
            let comment = await Comment.findById(req.params.id)
            res.send(comment)
        }
        catch (err) { next(err) }
    }
    async put(req, res, next) {
        try {
            let comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.send(comment)
        }
        catch (err) { next(err) }
    }

    async delete(req, res, next) {
        try {
            await Comment.findOneAndRemove({ _id: req.params.id })
            res.send("succesfully deleted!")
        }
        catch (err) { next(err) }
    }

}


// router.get('/:wiffleId', ({ params }, res, next) => {
//     Comment.find(params)
//         .then(comments => res.send({count: comments.length, comments}))
//         .catch(next)
// })

// router.put('/:id', (req, res, next) => {
//     Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         .then(comment => res.send(comment))
//         .catch(next)
// })

// router.delete('/:id', (req, res, next) => {
//     Comment.findByIdAndRemove(req.params.id)
//         .then(() => res.send({message: "Comment deleted."}))
//         .catch(next)
// })
