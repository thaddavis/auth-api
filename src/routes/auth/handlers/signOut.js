const { Account } = require("../../../db/models/Account");

module.exports = async function (req, res, next) {
  try {
    let { email } = req.user;

    const result = await Account.findOne({
      email,
    });

    if (result) {
      res.status(200).clearCookie("jwt").send();
    } else res.status(404).clearCookie("jwt").send();
  } catch (e) {
    next(e);
  }
};
