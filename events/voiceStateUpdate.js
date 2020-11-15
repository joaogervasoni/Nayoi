const { MessageEmbed } = require("discord.js");

module.exports = class{
    constructor(client){
        this.bot = client;
    }

    async run(oldState, newState){
        if(oldState.bot === true) return
        if(!oldState.channelID && !newState.channelID) return
        if(oldState.channelID === newState.channelID) return
    
        const lang = await this.bot.langs.langReturn(oldState.guild.language, "voiceStateUpdate", "event");
    
        try{
            const guild = await this.bot.database.findOne("guild", { 'guildId': oldState.guild.id });
            
            if (guild.log.status === "on") {
                let channel = oldState.guild.channels.cache.find(channel => channel.id === guild.log.channel);
                let embed = new MessageEmbed()
                .setTimestamp()
                .setColor(this.bot.baseColor)
    
                if((oldState.channelID === null || oldState.channelID === undefined) && newState.channelID !== null){
                    embed.setDescription(`:loud_sound: <@!${oldState.id}> ${lang.embedEnter} **<#${newState.channelID}>**`)
                }
                else if(oldState.channelID !== null && newState.channelID !== null){
                    embed.setDescription(`:loud_sound: <@!${oldState.id}> ${lang.embedChange1} **<#${oldState.channelID}>** // ${lang.embedChange2} **<#${newState.channelID}>**`)
                }
                else if(oldState.channelID !== null && newState.channelID === null){
                    embed.setDescription(`:loud_sound: <@!${oldState.id}> ${lang.embedExit} **<#${oldState.channelID}>**`)
                }
    
                return channel.send(embed)
            }
        }catch(e){
            this.bot.error.errorReturn(e, null, "voiceStateUpdate")
        }
    }
}