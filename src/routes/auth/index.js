const { authenticateToken } = require('../../middleware')

const {
    signIn,
    signUp,
    signOut,
    resetPassword,
    requestPasswordReset,
    deleteAccount,
    isAuthed
} = require('./handlers')

const router = require('express').Router()

// asdf

router.route('/isAuthed').get(authenticateToken, isAuthed)
router.route('/signin').post(signIn)
router.route('/signup').post(signUp)
router.route('/signOut').delete(signOut)
router.route('/requestPasswordReset').post(requestPasswordReset)
router.route('/resetPassword').post(resetPassword)
router.route('/deleteAccount').post(authenticateToken, deleteAccount)

module.exports = router;