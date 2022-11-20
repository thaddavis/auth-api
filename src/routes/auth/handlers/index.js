const signIn = require("./signIn");
const signUp = require("./signUp");
const signOut = require("./signOut");
const resetPassword = require("./resetPassword");
const mockRequestPasswordReset = require("./mockRequestPasswordReset");
const verifyAccount = require("./verifyAccount");
const mockReceiveVerificationToken = require("./mockReceiveVerificationToken");
const requestPasswordReset = require("./requestPasswordReset");
const deleteAccount = require("./deleteAccount");
const isAuthed = require("./isAuthed");
const clearAccounts = require("./clearAccounts");

module.exports = {
  signIn,
  signUp,
  resetPassword,
  requestPasswordReset,
  mockRequestPasswordReset,
  verifyAccount,
  mockReceiveVerificationToken,
  deleteAccount,
  clearAccounts,
  isAuthed,
  signOut,
};
