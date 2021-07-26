const signIn = require('./signIn')
const signUp = require('./signUp')
const signOut = require('./signOut')
const resetPassword = require('./resetPassword')
const requestPasswordReset = require('./requestPasswordReset')
const deleteAccount = require('./deleteAccount')
const isAuthed = require('./isAuthed')

module.exports = {
    signIn,
    signUp,
    resetPassword,
    requestPasswordReset,
    deleteAccount,
    isAuthed,
    signOut
}