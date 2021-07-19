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
    passwordHash: String 
})

schema.plugin(uniqueValidator)

const Account = mongoose.model('Account', schema)

module.exports = {
    Account
}