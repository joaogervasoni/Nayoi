const mongoose = require("mongoose");

const mapaSchema = mongoose.Schema({
    guildId: String,
    channelId: String,
    config:{
        status: String,
        creator: String,
        onlyImg: String
    },
    sendMsg:{
        status: String,
        msg: String,
        dm: String
    }
});

module.exports = mongoose.model("AutoDeleteMsg", mapaSchema);