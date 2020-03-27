const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports = (bot, guild, user) => {
    let logs = guild.fetchAuditLogs({type: 22});
    let entry = logs.entries.find('target', user);

    bot.Guild.findOne({'guildId': member.guild.id}, (err, guild) => {
        if(guild.log == "on"){
            
            let channel = guild.channels.find('id', guild.logChannel)
            if(channel != null){
                let embed = new Discord.RichEmbed()
                .addField(":hammer: [Banned]", `**User:** ${user} **Reason:** ${entry.reason} **By:** ${entry.executor}`)
            }
        }
    })
}