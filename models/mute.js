const mongoose = require("mongoose");

const muteSchema = mongoose.Schema({
    guildId: String,
    userId: String,
    date: String,
    executor: String,
    reason: String
})

module.exports = mongoose.model("Mute", muteSchema)