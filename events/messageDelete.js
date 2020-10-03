const { MessageEmbed } = require("discord.js");

module.exports = async (bot, message) => {
    if(!message.author) return
    let imageAtt = message.attachments.first() ? message.attachments.first().proxyURL : null
    
    //Snipe
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: imageAtt
    });

    //Log
    try{
        const guild = await bot.Guild.findOne({ 'guildId': message.guild.id });
        
        if (guild.log.status == "on") {
            let channel = message.guild.channels.cache.find(channel => channel.id === guild.log.channel);

            if (channel) {
                const lang = await bot.langs.langReturn(message.guild.language, "messageDelete", "event");
                
                let embed = new MessageEmbed()
                .setTitle(`:x: [${lang.embedTitle}]`)
                .addField(`**${lang.fieldUser}**`, message.author, true)
                .addField(`**${lang.fieldChannel}**`, message.channel, true)
                if(message.cleanContent) embed.addField(`**${lang.fieldMsg}**`, message.cleanContent)
                .addField(`**${lang.fieldTag}**`, message.author.tag, true)
                .addField(`**ID:**`, message.author.id, true)
                .setColor(bot.baseColor)
                .setTimestamp()
                if (imageAtt) embed.setImage(imageAtt);
            
                return channel.send(embed)
            }
        }
    }catch(e){
        bot.error.errorReturn(e, null, "messageDelete")
    }
}