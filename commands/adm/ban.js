const {errorReturn, returnNull, mentionById, limitLength} = require("../../utils/functions.js");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        cmd = args[0];

        if(returnNull(cmd) || returnNull(message.mentions.users.first())) return message.reply(lang.helpReturn)

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(cmd))
        if(!bUser) return message.channel.send(lang.returnNull);
        let bReason = args.join(" ").slice(cmd.length);
        if(!bReason) return message.channel.send(lang.reasonNull);
        
        if(bUser.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.returnInvalid);

        const embed = new MessageEmbed()
        .setTitle(lang.embedTitle)
        .addField(lang.embedFieldUser, mentionById(bUser.id) , true)
        .addField(lang.embedFieldReason, limitLength(bReason, "field"), true)
        .addField("ID", bUser.id, true)
        .setColor(bot.baseColor)
        .setImage("https://media1.tenor.com/images/021373dfbb72d1f0572111b9ea76490d/tenor.gif?itemid=9491505")
        .setTimestamp();
        
        await message.guild.member(bUser).ban(bReason)
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "ban",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["BAN_MEMBERS"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}