const mongoose = require('mongoose');
const { mongodb } = require("./botconfig.json");

if(mongoose.connection.readyState === 0){
    module.exports = mongoose.connect(`${mongodb}`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
}