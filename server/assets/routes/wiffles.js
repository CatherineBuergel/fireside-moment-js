let router = require('express').Router()
let Wiffle = require('../models/Wiffle')

router.post('', (req, res, next) => {
    Wiffle.create(req.body)
        .then(wiffle => res.send(wiffle))
        .catch(next)
})

router.get('', (req, res, next) => {
    Wiffle.find({})
        .then(wiffles => res.send({count: wiffles.length, wiffles}))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Wiffle.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(wiffle => res.send(wiffle))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Wiffle.findByIdAndRemove(req.params.id)
        .then(() => res.send({message: "Wiffle deleted."}))
        .catch(next)
})

module.exports = router