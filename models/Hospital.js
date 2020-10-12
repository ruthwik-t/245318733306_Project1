const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    hId: String,
    name: String,
    location: String,
    address: String,
    contactNumber: Number
})

module.exports = mongoose.model('Hospital', hospitalSchema)