const mongoose = require("mongoose");

const mapaSchema = mongoose.Schema({
    messageId: String,
    emojiRoleMappings:{
        type: Map,
        of: String,
        default: new Map()
      }
});

module.exports = mongoose.model("RoleReaction", mapaSchema);