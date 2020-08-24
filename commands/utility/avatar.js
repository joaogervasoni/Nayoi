const {errorReturn, returnNull} = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        let user = message.mentions.users.first();
        if (returnNull(user)) user = message.member.user;
        
        const embed = new MessageEmbed()
        .setThumbnail(user.avatarURL())
        .setTitle(`${lang.embedTitle} ${user.username}`)
        .setDescription(lang.embedDescription.replace(/{avatarURL}/g, user.avatarURL()))
        .setColor(bot.baseColor)

        return message.channel.send(embed)
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "avatar",
    type: "utility"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}