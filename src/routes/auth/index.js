const { authenticateToken } = require("../../middleware");

const {
  signIn,
  signUp,
  signOut,
  resetPassword,
  requestPasswordReset,
  mockRequestPasswordReset,
  mockReceiveVerificationToken,
  verifyAccount,
  deleteAccount,
  clearAccounts,
  isAuthed,
} = require("./handlers");

const router = require("express").Router();

router.route("/is-authed").get(authenticateToken, isAuthed);
router.route("/sign-in").post(signIn);
router.route("/sign-up").post(signUp);
router.route("/sign-out").delete(authenticateToken, signOut);
router.route("/request-password-reset").post(requestPasswordReset);
router.route("/mock-request-password-reset").post(mockRequestPasswordReset);
router
  .route("/mock-receive-verification-token")
  .post(mockReceiveVerificationToken);
router.route("/verify-account").post(verifyAccount);
router.route("/reset-password").post(resetPassword);
router.route("/delete-account").delete(authenticateToken, deleteAccount);
router.route("/accounts").delete(clearAccounts);

module.exports = router;
