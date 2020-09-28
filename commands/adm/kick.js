const {errorReturn, returnNull, mentionById, limitLength} = require("../../utils/functions.js");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        cmd = args[0];

        if(returnNull(cmd) || returnNull(message.mentions.users.first())) return message.reply(lang.helpReturn)

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(cmd))
        if(!kUser) return message.channel.send(lang.returnNull);
        let kReason = args.join(" ").slice(cmd.length);
        if(!kReason) return message.channel.send(lang.reasonNull);

        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(lang.returnInvalid);
        
        const embed = new MessageEmbed()
        .setTitle(lang.embedTitle)
        .addField(lang.embedFieldUser, mentionById(kUser.id) , true)
        .addField(lang.embedFieldReason, limitLength(kReason, "field"), true)
        .addField("ID", kUser.id, true)
        .setColor(bot.baseColor)
        .setTimestamp();

        await message.guild.member(kUser).kick(kReason);
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "kick",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["KICK_MEMBERS"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}