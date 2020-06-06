const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../utils/functions.js");

module.exports = async (bot, oldMessage, newMessage) => {
    
    //Log
    if(oldMessage.content == newMessage.content || newMessage.content === "") {
        return
    }
    try{
        bot.database;
        const guild = await bot.Guild.findOne({ 'guildId': oldMessage.guild.id });
        
        if (guild.log.status == "on" && oldMessage.channel.type == 'text') {
            let channel = oldMessage.guild.channels.cache.find(channel => channel.id === guild.log.channel)
            if (channel) {
                let embed = new MessageEmbed()
                    .setTitle(":grey_question: [Mensagem Editada]")
                    .addField(`**Usuário:**`, newMessage.author, true)
                    .addField(`**Channel:**`, newMessage.channel, true)
                    if(oldMessage.cleanContent) embed.addField(`**Mensagem Antiga:**`, oldMessage.content)
                    if(newMessage.cleanContent) embed.addField(`**Mensagem Nova:**`, newMessage.content)
                    .addField(`**Tag:**`, newMessage.author.tag, true)
                    .addField(`**ID:**`, newMessage.author.id, true)
                    .setTimestamp()

                return channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, null, "messageUpdate")
    }
}