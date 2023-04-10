// const { Account } = require("../models/Account");
// const { UserAccount } = require("../models/UserAccount");
//
// module.exports = async function (req, res, next) {
//     let user = await Account.findByPk(req.account.accountId, { include: { model: UserAccount, required: true } });
//     if (!user) return res.status(403).send("Access Denied");
//     req.account.userId = user.toJSON().userAccount.userId;
//     next();
// }