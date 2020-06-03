const mongoose = require('mongoose');
const { mongodb } = require("./botconfig.json");
var colors = require('colors');

if(mongoose.connection.readyState === 0){
    module.exports = mongoose.connect(`${mongodb}`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    console.log(`[Database]`.brightBlue + ` conexão com db estabelecida`.blue);
}
