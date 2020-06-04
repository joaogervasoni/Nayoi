const { MessageEmbed } = require("discord.js");
const {errorReturn, returnNull} = require("../functions.js");

module.exports = async (bot, oldState, newState) => {
    if(oldState.bot === true) return
    if(returnNull(oldState.channelID) && returnNull(newState.channelID)) return

    try{
        const guild = await bot.Guild.findOne({ 'guildId': oldState.guild.id });
        
        if (guild.log.status === "on") {
            let channel = oldState.guild.channels.cache.find(channel => channel.id === guild.log.channel);
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor(bot.baseColor)

            if(oldState.channelID === null && newState.channelID !== null){
                embed.setDescription(`:loud_sound: <@!${oldState.id}> entrou no voice: \`<#${newState.channelID}>\``)
            }
            else if(oldState.channelID !== null && newState.channelID !== null){
                embed.setDescription(`:loud_sound: <@!${oldState.id}> trocou do voice: \`<#${oldState.channelID}>\` // para o voice: \`<#${newState.channelID}>\``)
            }
            else if(oldState.channelID !== null && newState.channelID === null){
                embed.setDescription(`:loud_sound: <@!${oldState.id}> saiu do voice: \`<#${oldState.channelID}>\``)
            }

            return channel.send(embed)
        }
    }catch(e){
        errorReturn(e, null, "voiceStateUpdate")
    }
}