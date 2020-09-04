const mongoose = require("mongoose");

const mapaSchema = mongoose.Schema({
    guildId: String,
    user: String,
    date: String,
    bug: String
})

module.exports = mongoose.model("Bug", mapaSchema)