const { Account } = require("../../../db/models/Account");
const { SESClient, SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");
const { v4 } = require("uuid");

const { REGION } = require("../../../config");
const {
  generateResetPasswordConfigSes,
} = require("../../../emails/resetPassword");

const sesClient = new SESClient({ region: REGION });

module.exports = async function (req, res, next) {
  try {
    if (!process.env.MOCK_PASSWORD_RESET) res.status(401).send();

    const { email } = req.body;

    const result = await Account.findOne({ email });

    if (result) {
      // generate the reset password token
      const UUID = v4();
      result.resetPasswordToken = UUID;
      await result.save();
      const RESET_LINK = `${process.env.FRONTEND_DOMAIN}/resetPassword/${UUID}`;

      res.status(200).json({
        resetToken: UUID,
        resetLink: RESET_LINK,
      });
    } else res.status(404).send();
  } catch (e) {
    next(e);
  }
};
