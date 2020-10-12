require('dotenv/config')
const router = require('express').Router()
const { sign }= require('jsonwebtoken')


router.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const mockedUsername = process.env.MOCKUSERNAME
    const mockedPassword = process.env.MOCKPASSWORD
    if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
            const token = sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'})
            res.json({
                message: 'Authentication Success',
                token: token
            })
        } else {
            res.status(403).send({
                message: 'Invalid username or password'
            })
        }
    } else {
        res.status(400).send({
            message: 'Authentication failed'
        })
    }
})


module.exports = router
