const { MessageEmbed } = require("discord.js");
const { errorReturn } = require("../utils/functions.js");

module.exports = async (bot, oldMessage, newMessage) => {
    //Log
    if(oldMessage.content == newMessage.content || newMessage.content === "") return
    if(!oldMessage.author || !newMessage.author) return

    try{
        const guild = await bot.Guild.findOne({ 'guildId': oldMessage.guild.id });
        
        if (guild.log.status == "on") {
            let channel = oldMessage.guild.channels.cache.find(channel => channel.id === guild.log.channel)
            
            if (channel) {
                const lang = await bot.langs.langReturn(oldMessage.guild.language, "messageUpdate", "event");
                
                let embed = new MessageEmbed()                
                .setTitle(`:grey_question: [${lang.embedTitle}]`)
                .addField(`**${lang.fieldUser}**`, newMessage.author, true)
                .addField(`**${lang.fieldChannel}**`, newMessage.channel, true)
                if(oldMessage.cleanContent) embed.addField(`**${lang.fieldMsgOld}**`, oldMessage.content)
                if(newMessage.cleanContent) embed.addField(`**${lang.fieldMsgNew}**`, newMessage.content)
                .addField(`**${lang.fieldTag}**`, newMessage.author.tag, true)
                .addField(`**ID:**`, newMessage.author.id, true)
                .setColor(bot.baseColor)
                .setTimestamp()

                return channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, null, "messageUpdate")
    }
}