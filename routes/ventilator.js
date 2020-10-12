// INITIAL SETUP

const express = require('express')
const Ventilator = require('../models/Ventilator')

const router = express.Router()

// ROUTES 

router.get('/', async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        try {
            const vents = await Ventilator.find({})
            res.json(vents)
        } catch(err) {
            res.json({ message: err })
        }
        return
    } 
    try {
        const { status, name } = req.query
        const vents = await Ventilator.find({$and:[{status: status},{name: name}]})
        res.json(vents)
    } catch(err) {
        res.json({ message: err })
    }
})

router.post('/', async (req, res) => {
    const vent = new Ventilator(req.body)
    try {
        const addVent = await vent.save()
        res.json(addVent)
    } catch(err) {
        res.json({ message: err })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const vent = await Ventilator.findOneAndRemove({ventilatorId: req.params.id})
        res.json(vent)
    } catch(err) {
        res.json({ message: err })
    }
})

router.patch('/', async (req, res) => {
    try {
        const {ventilatorId, status} = req.body
        const vent = await Ventilator.updateOne({"ventilatorId": ventilatorId}, {$set: {"status": status}}) 
        res.json(vent)
    } catch(err) {
        res.json({ message: err })
    }
})

module.exports = router