const { Account } = require("../../../db/models/Account");

module.exports = async function (req, res, next) {
  try {
    let { email, verificationToken } = req.body;

    const result = await Account.findOne({
      email,
      verificationToken,
    });

    if (result) {
      result.verified = true;
      result.verificationToken = null;
      await result.save();

      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (e) {
    next(e);
  }
};
