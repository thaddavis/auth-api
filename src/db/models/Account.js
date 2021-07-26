const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({ 
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    resetPasswordToken: String,
    passwordHash: String,
    name: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false
    }
})

schema.plugin(uniqueValidator)

const Account = mongoose.model('Account', schema)

module.exports = {
    Account
}