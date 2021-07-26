const { Account } = require('../../../db/models/Account')
const argon2 = require('argon2')

module.exports = async function (req, res, next) {
    
    try {
        res.status(200).send()
    } catch(e) { next (e) }
    
}