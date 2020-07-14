const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    guildId: String,
    memberCount: String,
    createdAt: String,
    server: {
        lang: String,
        nsfw: String,
    },
    welcome: {
        status: String,
        msg: String,
        channel: String,
        canvas: String,
        canvasUrl: String,
    },
    autorole: {
        status: String,
        role: String,
    },
    log: {
        status: String,
        channel: String
    },
    twitch: {
        status: String,
        channel: String
    }
});

module.exports = mongoose.model("Guild", guildSchema);