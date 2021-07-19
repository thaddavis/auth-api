const { authenticateToken } = require('../../middleware')

const {
    signIn,
    signUp,
    resetPassword,
    requestPasswordReset,
    deleteAccount
} = require('./handlers')

const router = require('express').Router()

router.route('/signin').post(signIn)
router.route('/signup').post(signUp)
router.route('/requestPasswordReset').post(requestPasswordReset)
router.route('/resetPassword').post(resetPassword)
router.route('/deleteAccount').post(authenticateToken, deleteAccount)

module.exports = router;