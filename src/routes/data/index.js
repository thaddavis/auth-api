const { authenticateToken } = require('../../middleware')

const {
    isAuthed,
    getFeaturedChatMembers
} = require('./handlers')

const router = require('express').Router()

router.route('/isAuthed').get(authenticateToken, isAuthed)
router.route('/featuredChatMembers').get(getFeaturedChatMembers)

module.exports = router;