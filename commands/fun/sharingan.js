const { MessageEmbed } = require("discord.js");
const { randomCollection } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let member = message.guild.member(message.mentions.users.first() || message.guild.member(args[1]));
        if (!member) return message.reply(lang.helpReturn);
        let msg = await message.channel.messages.cache.filter(msg => msg.author.id === member.id);
        msg = msg.last();

        if (!msg) return message.reply(lang.returnNull);
        
        const embed = new MessageEmbed()
            .setDescription(`**${lang.embedDescription}** \`${member.user.tag}\` : ${msg.content}`)
            .setImage(randomCollection(bot.lists, this.help.name))
            .setAuthor(message.member.user.tag, message.member.user.avatarURL())
    
        return message.channel.send(embed)
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "sharingan",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}