const {errorReturn} = require("../utils/functions.js");
const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args, lang) => {

    try{
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const uptime = parseInt(process.uptime(), 10);
    
        var days = Math.floor(uptime / 86400 )
        var hours = Math.floor((uptime - (days * 86400)) / 3600);
        var min = Math.floor((uptime - (days * 86400) - (hours * 3600)) / 60)
    
        const embed = new MessageEmbed()
        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/nayoi/nayoiStats.png?raw=true")
        .setTitle(lang.stats)
        .addField(lang.servers, bot.guilds.cache.size, true)
        .addField(lang.channels, bot.channels.cache.size, true)
        .addField(lang.users, bot.users.cache.size, true)
        .addField(lang.memory, `${Math.round(used * 100) / 100} MB`, true)
        .addField(lang.uptime, `${days}D ${hours}H ${min}M`, true)
        .setTimestamp()
        .setColor(bot.baseColor)
    
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "stats",
    type: "help"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}