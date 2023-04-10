// const { Account } = require("../models/Account");
// const { Admin } = require("../models/Admin");
//
// module.exports = async function (req, res, next) {
//     let account = await Account.findByPk(req.account.accountId, { include: { model: Admin, required: true } });
//     if (!account) return res.status(403).send("Access Denied");
//     if (account.admin.role != "admin") return res.status(403).send("Access Denied");
//     req.account.adminId = account.admin.adminId;
//     req.account.role = account.admin.role;
//     next();
// }