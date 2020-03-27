const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports = (bot, member) => {
    let logs = member.guild.fetchAuditLogs();
    let entry = logs.entries.find('target',member.user);

    bot.Guild.findOne({ 'guildId': member.guild.id }, (err, guild) => {
        if(guild.log == "on"){

            let channel = member.guild.channels.find('id', guild.logChannel)
            if(channel != null){
                let embed = new Discord.RichEmbed()
                
                if (entry != null && entry.action == "MEMBER_KICK"){
                    embed
                    .addField(":ledger: [Kick]", `**User:** ${member.user} **Reason:** ${entry.reason} **By:** ${entry.executor}`)
                }
                else{
                    embed
                    .addField(":ledger: [Leave]", `**User:** ${member.user}`)
                }
                channel.send(embed)
            }
        }
    })
}