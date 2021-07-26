const { Account } = require('../../../db/models/Account')
const argon2 = require('argon2')

module.exports = async function (req, res, next) {
    try {
        
        const {
            name,
            email,
            password
        } = req.body

        // hash password and store in mongodb
        const passwordHash = await argon2.hash(password)

        const newAccount = new Account({
            name,
            email,
            passwordHash,
            resetPasswordToken: null
        })
        
        await newAccount.save()
        
        res.status(200).send()

    } catch(e) { next(e) }
}