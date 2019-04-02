const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]))
    if(!kUser) return message.channel.send("Couldn't find user");
    let kReason = args.join(" ").slice(22);

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Need permission");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("-Kick-")
    .setColor(bot.filoColor)
    .addField("Kicked User", `${kUser} with id ${kUser.id}`)
    .addField("Kicked by", `<@${message.author.id}> with id ${message.author.id}`)
    .addField("Kicked in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let incidentsChannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentsChannel) return message.channel.send("Couldn't find incidents channel");

    message.guild.member(kUser).kick(kReason);
    incidentsChannel.send(kickEmbed);

    return;
}

module.exports.help = {
    name: "kick"
}