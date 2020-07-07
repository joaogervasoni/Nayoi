const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../utils/functions.js");

module.exports = async (bot, message) => {
    const lang = await bot.langs.langReturn(message.guild.language, "messageDelete", "event");

    let imageAtt = message.attachments.first() ? message.attachments.first().proxyURL : null

    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: imageAtt
    });

    //Log
    try{
        const guild = await bot.Guild.findOne({ 'guildId': message.guild.id });
        
        if (guild.log.status == "on" && message.channel.type == 'text') {
            let channel = message.guild.channels.cache.find(channel => channel.id === guild.log.channel);

            if (channel) {
                if(!message.member){
                    //console.log("Channel:" + message.channel +" // Message" + message.cleanContent +"// Image:" + imageAtt);
                }else{
                    let embed = new MessageEmbed()
                    .setTitle(`:x: [${lang.embedTitle}]`)
                    .addField(`**${lang.fieldUser}**`, message.member.user, true)
                    .addField(`**${lang.fieldChannel}**`, message.channel, true)
                    if(message.cleanContent) embed.addField(`**${lang.fieldMsg}**`, message.cleanContent)
                    .addField(`**${lang.fieldTag}**`, message.member.user.tag, true)
                    .addField(`**ID:**`, message.member.user.id, true)
                    .setColor(bot.baseColor)
                    .setTimestamp()
                    if (imageAtt) embed.setImage(imageAtt);
                
                    return channel.send(embed)
                }
            }
        }
    }catch(e){
        errorReturn(e, null, "messageDelete")
    }
}