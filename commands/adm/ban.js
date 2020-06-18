const {errorReturn, returnNull} = require("../../utils/functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = (bot, message, args, lang) => {
    try{
        cmd = args[0];

        if(returnNull(cmd) || returnNull(message.mentions.users.first())) return message.reply(lang.helpReturn)

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(cmd))
        if(!bUser) return message.channel.send("Não encontrei esse usuário :thinking:");
        let bReason = args.join(" ").slice(cmd.length);
        
        if(bUser.hasPermission("MANAGE_GUILD")) return message.channel.send("Essa pessoa não pode levar Banimento :flushed:");
        let msg = "Usuário Banido: `"+bUser+"` || Razão: `"+bReason+"`";
        
        message.guild.member(bUser).ban(bReason)
        return message.channel.send(msg);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "ban",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}