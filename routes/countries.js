const {Country} = require("../Models/Country");
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const countries = await Country.find();
    res.status(200).json({
        status: true, message: 'success', data: {countries}
    });
});

router.post('/add', async (req, res) => {
    const request = req.body;
    const country = await Country.create({
        name: request.name,
    });
    console.log("Name : ", req.body.name)
    res.status(200).json({
        status: true, message: 'success', data: {
            country
        }
    });
});


module.exports = router;