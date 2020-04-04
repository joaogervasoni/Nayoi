const {MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, user) => {
    
    //Log
    const guild = await bot.Guild.findOne({'guildId': user.guild.id})
    try{
        if(guild.log == "on"){
            let logs = await guild.fetchAuditLogs({type: 22});
            let entry = logs.entries.cache.find('target', user);

            let channel = user.guild.channels.cache.find(channel => channel.id === guild.logChannel)
            if(channel != null){
                let embed = new MessageEmbed()
                .addField(":hammer: [Banido]", `**Usuário:** ${user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
            }
            channel.send(embed)
        }
    }catch(e){
        errorReturn(e, "guildBanAdd")
    }
}