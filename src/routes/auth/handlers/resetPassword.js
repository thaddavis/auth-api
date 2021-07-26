const { Account } = require('../../../db/models/Account')
const argon2 = require('argon2')

module.exports = async function (req, res, next) {
    
    try {

        const {
            email,
            resetPasswordToken,
            newPassword
        } = req.body

        const result = await Account.findOne({
            resetPasswordToken
        })

        if (result) {
            
            // found record for email and resetPasswordToken
            // so generate the hash of the new password, store, and notify of success

            const passwordHash = await argon2.hash(newPassword)

            result.passwordHash = passwordHash
            result.resetPasswordToken = null

            await result.save()
            
            res.status(200).send()

        } else { res.status(404).send() }

    } catch(e) { next (e) }
    
}