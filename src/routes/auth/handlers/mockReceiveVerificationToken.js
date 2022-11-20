const { Account } = require("../../../db/models/Account");

module.exports = async function (req, res, next) {
  try {
    if (!process.env.MOCK_ACCOUNT_VERIFICATION) res.status(401).send();

    let { email } = req.body;

    const result = await Account.findOne({
      email,
    });

    if (result) {
      res.status(200).send(result.verificationToken);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    next(e);
  }
};
