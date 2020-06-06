const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../utils/functions.js");

module.exports = async (bot, guild, user) => {
    
    //Log
    /*bot.database;
    const guilde = await bot.Guild.findOne({'guildId': guild.id});

    if(guilde.log.status === "on"){
        
        let logs = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"});
        let entry = await logs.entries.find(entry => entry.target === user);
        let channel = guild.channels.cache.find(channel => channel.id === guilde.log.channel)
        if(channel){
            let embed = new MessageEmbed()
            .addField(":hammer: [Banido]", `**Usuário:** ${user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
            .setTimestamp()
            channel.send(embed)
        }
    }*/
}