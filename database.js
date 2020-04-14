const mongoose = require('mongoose');
const { mongodb } = require("./botconfig.json");

module.exports = mongoose.connect(`${mongodb}`, {useNewUrlParser: true, useUnifiedTopology: true});