const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]))
    if(!bUser) return message.channel.send("Couldn't find user");
    let bReason = args.join(" ").slice(22);
    
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Need permission");
    if(bUser.hasPermission("MANAGE_GUILD")) return message.channel.send("That person can't be kicked");
    
    let banEmbed = new Discord.RichEmbed()
    .setDescription("-Ban-")
    .setColor(bot.filoColor)
    .addField("Banned User", `${bUser} with id ${bUser.id}`)
    .addField("Banned by", `<@${message.author.id}> with id ${message.author.id}`)
    .addField("Banned in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);
    
    let incidentsChannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentsChannel) return message.channel.send("Couldn't find incidents channel");
    
    message.guild.member(bUser).ban(bReason)
    incidentsChannel.send(banEmbed);

    return;
}

module.exports.help = {
    name: "ban"
}