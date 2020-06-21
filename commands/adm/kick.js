const {errorReturn} = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        cmd = args[0];

        if(returnNull(cmd) || returnNull(message.mentions.users.first())) return message.reply(lang.helpReturn)

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(cmd))
        if(!kUser) return message.channel.send(lang.returnNull);
        let kReason = args.join(" ").slice(cmd.length);

        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(lang.returnInvalid);
        
        const embed = new MessageEmbed()
        .setTitle(lang.embedTitle)
        .addField(lang.embedFieldUser, kUser , true)
        .addField(lang.embedFieldReason, kReason, true)
        .addField("ID", bUser.id, true)
        .setColor(bot.baseColor)
        .setTimestamp();

        await message.guild.member(kUser).kick(kReason);
        return message.channel.send(msg);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "kick",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: [],
    ownerOnly: false
}