const { Account } = require("../../../db/models/Account");

module.exports = async function (req, res, next) {
  try {
    if (!process.env.MOCK_DATABASE) res.status(401).send();

    await Account.deleteMany({});

    res.status(200).send();
  } catch (e) {
    next(e);
  }
};
