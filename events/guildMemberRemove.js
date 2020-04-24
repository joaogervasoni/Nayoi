const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../functions.js");

module.exports = async (bot, member)  => {

    //Log
    try{
        bot.database;
        const guild = await bot.Guild.findOne({ 'guildId': member.guild.id });
        if(guild.log.status == "on"){
            let logs = await member.guild.fetchAuditLogs();
            let entry = logs.entries.find(entry => entry.target === member.user);
             
            let channel = member.guild.channels.cache.find(channel => channel.id === guild.log.channel)
            if(channel){
                let embed = new MessageEmbed()
                if (entry != null && entry.action == "MEMBER_KICK"){
                    embed
                    .setThumbnail(member.user.avatarURL())
                    .setTitle(":ledger: [Kick]")
                    .addField(`**Usuário:**`, `${member.user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
                    .addField(`**Tag:**`, member.user.tag, true)
                    .addField(`**ID:**`, member.user.id, true)
                    .setTimestamp()
                }
                else if (entry != null && entry.action == "MEMBER_BAN_ADD"){
                    embed
                    .setThumbnail(member.user.avatarURL())
                    .setTitle(":hammer: [Ban]")
                    .addField(`**Usuário:**`, `${member.user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
                    .addField(`**Tag:**`, member.user.tag, true)
                    .addField(`**ID:**`, member.user.id, true)
                    .setTimestamp()
                }
                else{
                    embed
                    .setThumbnail(member.user.avatarURL())
                    .setTitle(":ledger: [Leave]")
                    .addField("**Usuário:**", member.user)
                    .addField(`**Tag:**`, member.user.tag, true)
                    .addField(`**ID:**`, member.user.id, true)
                    .setTimestamp()
                }
                channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, null, "guildMemberRemove")
    }
}