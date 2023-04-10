const {mongoose} = require('mongoose');
const {Country} = require("./Country");
const Joi = require('joi');

const msgSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email : {
        type: String,
        required: true,
        unique:true,
    },
    password : {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dateOfBirth : {
        type: String,
        required: true,
    },
    gender : {
        type: String,
        required: true,
    },
    country_id : {
        type: mongoose.Types.ObjectId,
        ref: Country.name,
        required : true,
    },
},  { timestamps: true })

const User = mongoose.model('User', msgSchema);

function validateLogin(admin) {
    const schema = Joi.object({
        email: Joi.string().email().required().trim(),
        password: Joi.string().required().trim().min(8).max(50),
    });
    return schema.validate(admin);
}

function validateAccount(account) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);

    const schema = Joi.object({
        firstName: Joi.string().required().trim().min(1).max(255),
        lastName: Joi.string().required().trim().min(1).max(255),
        username: Joi.string().required().trim().min(1).max(255),
        email: Joi.string().email().required().trim(),
        password: Joi.string().required().trim().min(8).max(50),
        dateOfBirth: Joi.required(),
        gender: Joi.string().optional().valid("Male", "Female"),
        phone: Joi.required(),
        country_id: Joi.required(),
    });

    return schema.validate(account);
}

function validatePassword(password) {
    const schema = Joi.object({
        oldPassword: Joi.string().required().trim().min(8).max(50),
        newPassword: Joi.string().required().trim().min(8).max(50)
    });
    return schema.validate(password);
}

module.exports.User = User;
module.exports.validateAccount = validateAccount;
module.exports.validateLogin = validateLogin;
module.exports.validatePassword = validatePassword;
