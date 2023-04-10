const express = require("express");
const users = require("../routes/users");
const countries = require("../routes/countries");

module.exports = (app) => {
    app.use(express.json());
    app.use("/users", users);
    app.use("/countries", countries);
}
