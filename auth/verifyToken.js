require('dotenv/config')
const { verify } = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }
        verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedJSON) => {
            if (err) {
                return res.status(401).send({
                    message: 'Your access token is not valid'
                })
            } else {
                req.decoded = decodedJSON;
                next();
            }
        })
        
    } else {
        return res.status(422).send({
            message: 'Could not find the Auth Token'
        });
    }
};

module.exports = checkToken