const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/e-commerce",
        (err) =>
            err ? console.log(err) : console.log(
                "Connected to yourDB-name database")
    );
};
