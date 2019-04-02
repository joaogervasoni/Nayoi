const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let boticon = bot.user.avatarURL;
    
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setThumbnail(boticon)
    .setColor(bot.filoColor)
    .addField("Bot Name", bot.user.username, true)
    .addField("My master", "Zaetic#9549", true)
    .addField("Created On", bot.user.createdAt);
    
    return message.channel.send(botembed);
}

module.exports.help = {
    name: "botinfo"
}