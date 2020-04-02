const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);

module.exports.run = async (bot, message, args) => {
    let msg = args.join(" ").slice(0);
    let channelId = msg.slice(2,20);

    //say #chat msg
    if(!isNaN(channelId)){
        let guildMention = message.guild.channels.cache.get(channelId)
        let msgMention = args.join(" ").slice(22)
        return guildMention.send(msgMention)
    } 

    //say msg
    return message.channel.send(msg)   
}

module.exports.help = {
    name: "say"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}