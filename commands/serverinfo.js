const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var onlineCount = message.guild.members.filter(m => m.presence.status === 'online').size;
    var offlineCount = message.guild.members.filter(m => m.presence.status === 'offline').size;
    var idleCount = message.guild.members.filter(m => m.presence.status === 'idle').size;
    var dndCount = message.guild.members.filter(m => m.presence.status === 'dnd').size;

    let servericon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server info")
    .setThumbnail(servericon)
    .setColor(bot.filoColor)
    .addField("Server name", message.guild.name)
    .addField("id", message.guild.id, true)
    .addField("Region", message.guild.region, true)
    .addField("Created on", message.guild.createdAt)
    .addField("You joined", message.guild.joinedAt)
    .addField(`Total Members ${message.guild.memberCount}`, 
    `Online: ${onlineCount} | Offline: ${offlineCount} | Indle: ${idleCount} | DnD: ${dndCount}`);

    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo"
}