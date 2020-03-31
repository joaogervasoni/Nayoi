const {RichEmbed} = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, member)  => {

    //Log
    try{
        const guild = await bot.Guild.findOne({ 'guildId': member.guild.id });
        if(guild.log == "on"){
            let logs = await member.guild.fetchAuditLogs();
            let entry = logs.entries.find('target', member.user);

            let channel = message.guild.channels.find(channel => channel.id === guild.logChannel)
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
        let channel = message.guild.channels.find(channel => channel.id === guild.logChannel)
        errorReturn(e, channel)
    }
}