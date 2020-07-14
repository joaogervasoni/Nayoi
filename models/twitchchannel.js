const mongoose = require("mongoose");

const mapaSchema = mongoose.Schema({
    name: String,
    streamerId: String,
    servers: String
});

module.exports = mongoose.model("TwitchChannel", mapaSchema);