let router = require('express').Router()
let Comment = require('../models/Comment')

router.post('', (req, res, next) => {
    Comment.create(req.body)
        .then(comment => res.send(comment))
        .catch(next)
})

router.get('/:wiffleId', ({ params }, res, next) => {
    Comment.find(params)
        .then(comments => res.send({count: comments.length, comments}))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(comment => res.send(comment))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id)
        .then(() => res.send({message: "Comment deleted."}))
        .catch(next)
})

module.exports = router