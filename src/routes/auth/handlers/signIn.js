const { Account } = require('../../../db/models/Account')

const {
  generateAccessToken
} = require('../../../utils')

const argon2 = require('argon2')

module.exports = async function (req, res, next) {
    try {
        
        const {
            email,
            password
        } = req.body

        const result = await Account.findOne({ email })
        
        if (result) {
            
            const {
                passwordHash
            } = result

            if (await argon2.verify(passwordHash, password)) {

                const token = generateAccessToken({ email })
                res.status(200).cookie('jwt', token, {
                    sameSite: 'strict',
                    path: '/',
                    expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 2) ),
                    httpOnly: true,
                }).send()

            } else res.status(401).send()

        } else { res.status(404).send() }

    } catch(e) { next(e) }
}

