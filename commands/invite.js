const {errorReturn} = require("../utils/functions.js");
const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        const embed = new MessageEmbed()
        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/nayoi/nayoiHappy.gif?raw=true")
        .setTitle(lang.embedTitle)
        .setDescription(lang.embedDescription.replace(/{avatarURL}/g, "https://discordapp.com/oauth2/authorize?client_id=561319501317144576&scope=bot&permissions=8"))
        .setTimestamp()
        .setColor(bot.baseColor)
        
        return message.channel.send(embed)
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "invite",
    type: "help"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}