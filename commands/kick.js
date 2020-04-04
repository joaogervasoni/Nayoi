const {RichEmbed} = require("discord.js");
const {errorReturn} = require("../functions.js");

module.exports.run = async (bot, message, args) => {
    try{
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]))
        if(!kUser) return message.channel.send("Não encontrei esse usuário");
        let kReason = args.join(" ").slice(22);

        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Essa pessoa não pode levar Kick");

        let kickEmbed = new RichEmbed()
        .setDescription("-Kick-")
        .setColor(bot.filoColor)
        .addField("Usuário kickado", `${kUser} com id ${kUser.id}`)
        .addField("Kickado por", `<@${message.author.id}> com id ${message.author.id}`)
        .addField("Kickado em", message.channel)
        .addField("Tempo", message.createdAt)
        .addField("Razão", kReason);

        let incidentsChannel = message.guild.channels.cache.find(incidentsChannel => incidentsChannel.name === "incidents");
        if(!incidentsChannel) return message.channel.send("Não encontrei o canal 'incidents'");

        message.guild.member(kUser).kick(kReason);
        incidentsChannel.send(kickEmbed);
        
        return;
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "kick"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: [],
    ownerOnly: false
}