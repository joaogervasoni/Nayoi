const {RichEmbed} = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, guild, user, message) => {
    
    //Log
    bot.Guild.findOne({'guildId': member.guild.id}, (err, guild) => {
        try{
            if(guild.log == "on"){
                let logs = guild.fetchAuditLogs({type: 22});
                let entry = logs.entries.find('target', user);
    
                let channel = guild.channels.find('id', guild.logChannel)
                if(channel != null){
                    let embed = new RichEmbed()
                    .addField(":hammer: [Banido]", `**Usuário:** ${user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
                }
                channel.send(embed)
            }
        }catch(e){
            errorReturn(e, message)
        }
    })
}