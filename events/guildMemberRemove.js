const {RichEmbed} = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, member, message)  => {

    //Log
    bot.Guild.findOne({ 'guildId': member.guild.id }, (err, guild) => {
        try{
            if(guild.log == "on"){
                let logs = member.guild.fetchAuditLogs();
                let entry = logs.entries.find('target', member.user);
    
                let channel = member.guild.channels.find('id', guild.logChannel)
                if(channel != null){
                    let embed = new RichEmbed()
                    
                    if (entry != null && entry.action == "MEMBER_KICK"){
                        embed
                        .addField(":ledger: [Kick]", `**Usuário:** ${member.user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
                    }
                    else{
                        embed
                        .addField(":ledger: [Leave]", `**Usuário:** ${member.user}`)
                    }
                    channel.send(embed)
                }
            }
        }catch(e){
            errorReturn(e, message)
        }
    })
}