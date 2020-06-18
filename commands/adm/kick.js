const {errorReturn} = require("../../utils/functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = (bot, message, args, lang) => {
    try{
        cmd = args[0];

        if(returnNull(cmd) || returnNull(message.mentions.users.first())) return message.reply(lang.helpReturn)

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(cmd))
        if(!kUser) return message.channel.send("Não encontrei esse usuário :thinking:");
        let kReason = args.join(" ").slice(cmd.length);

        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Essa pessoa não pode levar Kick :flushed:");
        let msg = "Usuário kickado: `"+kUser+"` || Razão: `"+kReason+"`";

        message.guild.member(kUser).kick(kReason);
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