const { MessageEmbed } = require("discord.js");
const { errorReturn, randomCollection } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let user = message.mentions.users.first()
        if (!user) return message.reply(lang.helpReturn);
        let msg = await message.channel.messages.cache.filter(msg => msg.author.id === user.id);
        msg = msg.last();
        if (!msg) return message.reply(lang.returnNull);
        
        const embed = new MessageEmbed()
            .setDescription(`**${lang.embedDescription}** \`${user.tag}\` : ${msg.content}`)
            .setImage(randomCollection(bot.lists, this.help.name))
            .setAuthor(message.member.user.tag, message.member.user.avatarURL())
    
        return message.channel.send(embed)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "sharingan",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false
}