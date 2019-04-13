const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let args2 = args.join(" ").slice(0)
    
    if(args2 === "bot"){
        let boticon = bot.user.avatarURL;
    
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setThumbnail(boticon)
        .setColor(bot.filoColor)
        .addField("Bot Name", bot.user.username, true)
        .addField("My master", "Zaetic#9549", true)
        .addField("Created On", bot.user.createdAt)
        .addField("Ms:", message.client.ping, true)
        
        return message.channel.send(botembed);
    }
    
    if(args2 === "server"){
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

    return message.reply("Need a info prefix");
}


module.exports.help = {
    name: "info"
}