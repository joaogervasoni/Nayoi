const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../functions.js");

module.exports.run = async (bot, message, args) => {
    try{
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]))
        if(!bUser) return message.channel.send("Não encontrei esse usuário");
        let bReason = args.join(" ").slice(22);
        
        if(bUser.hasPermission("MANAGE_GUILD")) return message.channel.send("Essa pessoa não pode levar Ban");
        
        let banEmbed = new MessageEmbed()
        .setDescription("-Ban-")
        .setColor(bot.filoColor)
        .addField("Usuário banido", `${bUser} com id ${bUser.id}`)
        .addField("Banido por", `<@${message.author.id}> com id ${message.author.id}`)
        .addField("Banido em", message.channel)
        .addField("Tempo", message.createdAt)
        .addField("Razão", bReason);
        
        let incidentsChannel = message.guild.channels.cache.find(incidentsChannel => incidentsChannel.name === "incidents");
        if(!incidentsChannel) return message.channel.send("Não encontrei o canal 'incidents'");
        
        message.guild.member(bUser).ban(bReason)
        incidentsChannel.send(banEmbed);

        return;
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