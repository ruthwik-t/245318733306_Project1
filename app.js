// INITIAL SETUP

require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const hospRoute = require('./routes/hospital')
const ventRoute = require('./routes/ventilator')
const verifyToken = require('./auth/verifyToken')
const createToken = require('./auth/createToken')

const app = express()

// MIDDLEWERE

app.use(express.json())

// LOGIN ROUTE

app.use('/login', createToken);

// ROUTES MIDDLEWERE

app.use('/hospitals', verifyToken, hospRoute)
app.use('/ventilators', verifyToken,ventRoute)

// DB CONNECTION

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
})
.then(() => console.log('connected to database'))
.catch(err => console.log(err))

// PORT CONNECTION

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
})