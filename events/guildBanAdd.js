const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../functions.js");

module.exports = async (bot, user) => {
    
    //Log
    bot.database;
    const guild = await bot.Guild.findOne({'guildId': user.guild.id})
    try{
        if(guild.log.status == "on"){
            let logs = await guild.fetchAuditLogs({type: 22});
            let entry = logs.entries.find('target', user);

            let channel = user.guild.channels.cache.find(channel => channel.id === guild.log.channel)
            if(channel != null){
                let embed = new MessageEmbed()
                .addField(":hammer: [Banido]", `**Usuário:** ${user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
                .setTimestamp()
                channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, null, "guildBanAdd")
    }
}