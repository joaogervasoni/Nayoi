const {MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, member)  => {

    //Log
    try{
        mongoose.connect(`${bot.mongodb}`);
        const guild = await bot.Guild.findOne({ 'guildId': member.guild.id });
        if(guild.log == "on"){
            let logs = await member.guild.fetchAuditLogs();
            let entry = logs.entries.find(entry => entry.target === member.user);
             
            let channel = member.guild.channels.cache.find(channel => channel.id === guild.logChannel)
            if(channel != null){
                let embed = new MessageEmbed()
                
                if (entry != null && entry.action == "MEMBER_KICK"){
                    embed
                    .setThumbnail(member.user.avatarURL())
                    .setTitle(":ledger: [Kick]")
                    .addField(`**Usuário:** ${member.user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
                    .addField(`**Tag:** ${member.user.tag}`, true)
                    .addField(`**ID:** ${member.user.id}`, true)
                    .setTimestamp()
                }
                else{
                    embed
                    .setThumbnail(member.user.avatarURL())
                    .setTitle(":ledger: [Leave]")
                    .addField("**Usuário:**", `${member.user}`)
                    .addField(`**Tag:**, ${member.user.tag}`, true)
                    .addField(`**ID:**, ${member.user.id}`, true)
                    .setTimestamp()
                }
                channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, "guildMemberRemove")
    }
}