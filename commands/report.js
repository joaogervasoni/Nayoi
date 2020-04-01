const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!rUser) return message.channel.send("Não encontrei este usuário");
    let reason = args.join(" ").slice(22)   
    
    let reportEmbed = new RichEmbed()
    .setDescription("Reports")
    .setColor(bot.filoColor)
    .addField("Usuário reportado", `${rUser} with ID: ${rUser.id}`)
    .addField("Reportado por", `${message.author} with id: ${message.author.id}`)
    .addField("Canal", message.channel)
    .addField("Tempo", message.createdAt)
    .addField("Razão", reason);    
    
    let reportschannel = message.guild.channels.find(reportschannel => reportschannel.name === "reports");
    if(!reportschannel) return message.channel.send("Não encontrei o canal 'reports'"); 
    
    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
}

module.exports.help = {
    name: "report"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}