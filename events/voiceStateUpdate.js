const { MessageEmbed } = require("discord.js");
const { errorReturn, returnNull } = require("../utils/functions.js");

module.exports = async (bot, oldState, newState) => {
    if(oldState.bot === true) return
    if(returnNull(oldState.channelID) && returnNull(newState.channelID)) return

    const lang = await bot.langs.langReturn(oldState.guild.language, "voiceStateUpdate", "event");

    try{
        const guild = await bot.Guild.findOne({ 'guildId': oldState.guild.id });
        
        if (guild.log.status === "on") {
            let channel = oldState.guild.channels.cache.find(channel => channel.id === guild.log.channel);
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor(bot.baseColor)

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
        errorReturn(e, null, "voiceStateUpdate")
    }
}