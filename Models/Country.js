const {mongoose} = require('mongoose');

const msgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
},  { timestamps: true })

const Country = mongoose.model('Country', msgSchema);

module.exports.Country = Country;
