const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../../utils/functions.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        const msg = bot.snipes.get(message.channel.id);
        if (!msg) return message.reply(lang.returnNull);
    
        const embed = new MessageEmbed()
            .setAuthor(`${lang.embedAuthor} ${msg.author.tag}`, msg.author.avatarURL())
            .setDescription(msg.content)
    
        if (msg.image) embed.setImage(msg.image);
        
        message.channel.send(embed);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "snipe",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false
}