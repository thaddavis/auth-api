const { Account } = require('../../../db/models/Account')

module.exports = async function (req, res, next) {
    try {

        const emailToDelete = req.body && req.body.email
        const { email } = req.user

        if (email === emailToDelete) {
            
            const result = await Account.deleteOne({ email })

            const {
                n,
                ok,
                deletedCount
            } = result
        
            if (n === 1 && ok === 1 && deletedCount === 1) {
                res.status(200).send()
            } else {
                res.status(404).send()
            }

        } else { res.status(401).send() }

    } catch(e) { next(e) }
}