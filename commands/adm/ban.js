const {returnNull, mentionById, limitLength} = require("../../utils/functions.js");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        cmd = args[0];
        let bUser = {
            id: null,
            type: null,
            user: null
        }

        if(returnNull(cmd)) return message.reply(lang.helpReturn)

        if(isNaN(cmd)) bUser.user = message.guild.member(message.mentions.users.first() || message.guild.member.get(cmd))
        if(bUser.user) {
            bUser.type = "get";
            bUser.id = bUser.user.id;

            if(bUser.user.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.returnInvalid);
        }
        if(cmd && !isNaN(cmd)){
            bUser.user = cmd;
            bUser.type = "id";
            bUser.id = cmd;
        } 
        
        if(!bUser.user) return message.channel.send(lang.returnNull);
        
        let bReason = args.join(" ").slice(cmd.length);
        if(!bReason) return message.channel.send(lang.reasonNull);

        if(bUser.type === "id") await message.guild.members.ban(bUser.user, { days: 0, reason: bReason })
        else await message.guild.member(bUser.user).ban({ days: 0, reason: bReason })
        
        const embed = new MessageEmbed()
        .setTitle(lang.embedTitle)
        .addField(lang.embedFieldUser, mentionById(bUser.id) , true)
        .addField(lang.embedFieldReason, limitLength(bReason, "field"), true)
        .addField("ID", bUser.id, true)
        .setColor(bot.baseColor)
        .setImage("https://media1.tenor.com/images/021373dfbb72d1f0572111b9ea76490d/tenor.gif?itemid=9491505")
        .setTimestamp();
        
        return message.channel.send(embed);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
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