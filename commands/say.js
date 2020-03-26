const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);

module.exports.run = async (bot, message, args) => {
    let msg = args.join(" ").slice(0);
    let channelId = msg.slice(2,20);

    //say msg (db channel)
    bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

        if(!guild.channel === "none"){
            
            let chat = message.guild.channels.find(`guildId`,guild.id)
            return chat.send(msg)
        }
    })

    //say #chat msg
    if(!isNaN(channelId)){
        let guildMention = message.guild.channels.get(channelId)
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