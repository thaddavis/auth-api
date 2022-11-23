const { Account } = require("../../../db/models/Account");
const argon2 = require("argon2");

module.exports = async function (req, res, next) {
  try {
    let { email } = req.user;

    const result = await Account.findOne({
      email,
    });

    if (result) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (e) {
    next(e);
  }
};
