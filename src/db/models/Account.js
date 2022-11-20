const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  verificationToken: String,
  passwordHash: String,
  name: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

schema.plugin(uniqueValidator);

const Account = mongoose.model("Account", schema);

module.exports = {
  Account,
};
