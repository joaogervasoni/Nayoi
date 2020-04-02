const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../functions.js");

module.exports.run = (bot, message, args) => {
    try{
        const msg = bot.snipes.get(message.channel.id);
        if (!msg) return message.reply("Sem mensagem");
    
        const embed = new MessageEmbed()
            .setAuthor(`Deletada por ${msg.author.tag}`, msg.author.avatarURL())
            .setDescription(msg.content)
    
        if (msg.image) embed.setImage(msg.image);
        
        message.channel.send(embed);
    }catch(e){
        errorReturn(e, message.channel)
    }
}

module.exports.help = {
    name: "snipe"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}