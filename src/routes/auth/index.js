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

router.route("/isAuthed").get(authenticateToken, isAuthed);
router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/signOut").delete(authenticateToken, signOut);
router.route("/requestPasswordReset").post(requestPasswordReset);
router.route("/mockRequestPasswordReset").post(mockRequestPasswordReset);
router
  .route("/mockReceiveVerificationToken")
  .post(mockReceiveVerificationToken);
router.route("/verifyAccount").post(verifyAccount);
router.route("/resetPassword").post(resetPassword);
router.route("/deleteAccount").delete(authenticateToken, deleteAccount);
router.route("/accounts").delete(clearAccounts);

module.exports = router;
