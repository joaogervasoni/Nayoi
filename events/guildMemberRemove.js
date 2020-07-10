const { MessageEmbed } = require("discord.js");
const { errorReturn } = require("../utils/functions.js");

module.exports = async (bot, member)  => {
    try{
        const lang = await bot.langs.langReturn(member.guild.language, "guildMemberRemove", "event");
        const guild = await bot.Guild.findOne({ 'guildId': member.guild.id });

        //Update memberCount
        guild.memberCount = member.guild.memberCount;
        guild.save();
        
        //Log
        if(guild.log.status == "on"){
            let logs = await member.guild.fetchAuditLogs();
            let entry = await logs.entries.find(entry => entry.target === member.user);
             
            let channel = member.guild.channels.cache.find(channel => channel.id === guild.log.channel)
            if(channel){
                let embed = new MessageEmbed()
                if (entry != null && entry.action == "MEMBER_KICK"){
                    embed
                    .setThumbnail(member.user.avatarURL())
                    .setTitle(`:ledger: [${lang.titleKick}]`)
                    .addField(`**${lang.fieldUser}**`, `${member.user} **${lang.fieldReason}** ${entry.reason} **${lang.fieldExecutor}** ${entry.executor}`)
                    .addField(`**${lang.fieldTag}**`, member.user.tag, true)
                    .addField(`**ID:**`, member.user.id, true)
                    .setColor(bot.baseColor)
                    .setTimestamp()
                }
                else if (entry != null && entry.action == "MEMBER_BAN_ADD"){
                    embed
                    .setThumbnail(member.user.avatarURL())
                    .setTitle(`:hammer: [${lang.titleBan}]`)
                    .addField(`**${lang.fieldUser}**`, `${member.user} **${lang.fieldReason}** ${entry.reason} **${lang.fieldExecutor}** ${entry.executor}`)
                    .addField(`**${lang.fieldTag}**`, member.user.tag, true)
                    .addField(`**ID:**`, member.user.id, true)
                    .setColor(bot.baseColor)
                    .setTimestamp()
                }
                else{
                    embed
                    .setThumbnail(member.user.avatarURL())
                    .setTitle(`:ledger: [${lang.titleLeave}]`)
                    .addField(`**${lang.fieldUser}**`, member.user)
                    .addField(`**${lang.fieldTag}**`, member.user.tag, true)
                    .addField(`**ID:**`, member.user.id, true)
                    .setColor(bot.baseColor)
                    .setTimestamp()
                }
                channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, null, "guildMemberRemove")
    }
}