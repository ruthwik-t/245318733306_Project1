// INITIAL SETUP

const express = require('express')
const Hospital = require('../models/Hospital')

const router = express.Router()

// ROUTES
 
router.get('/', async (req, res) => {
    try {
        const hosps = await Hospital.find({})
        res.json(hosps)
    } catch (err) {
        res.json({ message: err })
    }   
})

router.post('/', async (req, res) => {
    const hosp = new Hospital(req.body)
    try {
        const addHosp = await hosp.save()
        res.json(addHosp)
    } catch (err) {
        res.json({ message: err })
    }   
})

router.get('/:id', async (req, res) => {
    try {
        const hosps = await Hospital.find({hId: req.params.id})
        res.json(hosps)
    } catch (err) {
        res.json({ message: err })
    }   
})

module.exports = router