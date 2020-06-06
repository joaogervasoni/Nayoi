const {errorReturn} = require("../../utils/functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = (bot, message, args) => {
    try{
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]))
        if(!kUser) return message.channel.send("Não encontrei esse usuário :thinking:");
        let kReason = args.join(" ").slice(args[0].length);

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
    description: "Kicka a pessoa do servidor",
    usability: "Pode ser utilizado digitando `"+prefix+"kick @usuario razão`\n",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: [],
    ownerOnly: false
}