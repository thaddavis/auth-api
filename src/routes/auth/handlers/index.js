const signIn = require('./signIn')
const signUp = require('./signUp')
const resetPassword = require('./resetPassword')
const requestPasswordReset = require('./requestPasswordReset')
const deleteAccount = require('./deleteAccount')

module.exports = {
    signIn,
    signUp,
    resetPassword,
    requestPasswordReset,
    deleteAccount
}