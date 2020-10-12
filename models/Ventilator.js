const mongoose = require('mongoose')

const ventSchema = new mongoose.Schema({
    hId: String,
    ventilatorId: String,
    status: String,
    name: String
})

module.exports = mongoose.model('Ventilator', ventSchema)