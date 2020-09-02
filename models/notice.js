const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
    guildId: String,
    channelId: String,
    date: String,
    text: String,
    textType: String
});

module.exports = mongoose.model("Notice", noticeSchema);