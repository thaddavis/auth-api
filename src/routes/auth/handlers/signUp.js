const { Account } = require("../../../db/models/Account");
const argon2 = require("argon2");
const { v4 } = require("uuid");

module.exports = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    // hash password and store in db
    const passwordHash = await argon2.hash(password);
    const verificationToken = v4();

    const newAccount = new Account({
      name,
      email,
      passwordHash,
      verificationToken,
    });

    await newAccount.save();

    res.status(200).send();
  } catch (e) {
    next(e);
  }
};
