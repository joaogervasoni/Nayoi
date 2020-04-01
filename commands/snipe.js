const {RichEmbed} = require("discord.js");

module.exports.run = (bot, message, args) => {
    const msg = bot.snipes.get(message.channel.id);
    if (!msg) return message.reply("Sem mensagem");

    const embed = new RichEmbed()
        .setAuthor(`Deletada por ${msg.author.tag}`, msg.author.avatarURL)
        .setDescription(msg.content)

    if (msg.image) embed.setImage(msg.image);
    
    message.channel.send(embed);
}

module.exports.help = {
    name: "snipe"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}