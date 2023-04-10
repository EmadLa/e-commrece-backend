const {User, validateLogin, validateAccount} = require("../Models/User");
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');
const router = express.Router();
require("dotenv").config();

const getToken = (email, id) => {
    return jwt.sign(
        {user_id: id, email},
        process.env.TOKEN_KEY,
    );
}

router.post('/login', async (req, res) => {
    const {error} = validateLogin(req.body);
    if (error) return res.status(400).json({
        status: false, message: 'failed', data: error.details[0].message
    });

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user)
        return res.status(400).json({
            status: false, message: 'failed', data: "User Not exists"
        });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).json({
        status: true, message: 'success', data: "Wrong Credentials"
    });


    const email = req.body.email
    const token = getToken(email, user._id);
    res.status(200).json({
        status: true, message: 'success', data: {user}, access_token: token
    });
});

router.post('/register', async (req, res) => {
    const request = req.body;
    const {error} = validateAccount(request);
    if (error) return res.status(400).json({
        status: false, message: 'failed', data: error.details[0].message
    });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
        ...req.body
    });

    const email = req.body.email;
    const token = jwt.sign(
        {user_id: user._id, email},
        process.env.TOKEN_KEY,
    );

    res.status(200).json({
        status: true, message: 'success', data: user, access_token: token
    });
});

router.get('/welcome', auth, (req, res) => {
    res.status(200).json({
        status: true, message: 'success', data: "Welcome"
    });
})


module.exports = router;
