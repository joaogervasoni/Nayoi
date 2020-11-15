const { MessageEmbed } = require("discord.js");
const { limitLength } = require("../utils/functions.js");

module.exports = class{
    constructor(client){
        this.bot = client;
    }

    async run(member){
        try{
            const lang = await this.bot.langs.langReturn(member.guild.language, "guildMemberRemove", "event");
            const guild = await this.bot.database.findOne("guild", { 'guildId': member.guild.id });
    
            //MemberCount
            if(member.guild.memberCount){
                guild.memberCount = member.guild.memberCount;
                await this.bot.database.save(guild);
            }
    
            //Log
            if(guild.log.status == "on"){
                let logs = await member.guild.fetchAuditLogs();
                let entry = await logs.entries.find(entry => entry.target === member.user);
                let channel = member.guild.channels.cache.get(guild.log.channel)
    
                if(channel){
                    let embed = new MessageEmbed()
                    .setThumbnail(member.user.avatarURL())
                    .setColor(this.bot.baseColor)
                    .setTimestamp()
    
                    if (entry != null && entry.action == "MEMBER_KICK"){
                        embed
                        .setTitle(`:ledger: [${lang.titleKick}]`)
                        .addField(`**${lang.fieldUser}**`, limitLength(`${member.user} **${lang.fieldReason}** ${entry.reason} **${lang.fieldExecutor}** ${entry.executor}`, "field"))
                        .addField(`**${lang.fieldTag}**`, member.user.tag, true)
                        .addField(`**ID:**`, member.user.id, true)
                    }
                    else if (entry != null && entry.action == "MEMBER_BAN_ADD"){
                        embed
                        .setTitle(`:hammer: [${lang.titleBan}]`)
                        .addField(`**${lang.fieldUser}**`, limitLength(`${member.user} **${lang.fieldReason}** ${entry.reason} **${lang.fieldExecutor}** ${entry.executor}`, "field"))
                        .addField(`**${lang.fieldTag}**`, member.user.tag, true)
                        .addField(`**ID:**`, member.user.id, true)
                    }
                    else{
                        embed
                        .setTitle(`:ledger: [${lang.titleLeave}]`)
                        .addField(`**${lang.fieldUser}**`, member.user)
                        .addField(`**${lang.fieldTag}**`, member.user.tag, true)
                        .addField(`**ID:**`, member.user.id, true)
                    }
                    channel.send(embed)
                }
            }
        }catch(e){
            bot.error.errorReturn(e, null, "guildMemberRemove")
        }
    }
}