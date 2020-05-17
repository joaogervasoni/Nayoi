const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../functions.js");

module.exports = async (bot, message) => {
    let imageAtt = message.attachments.first() ? message.attachments.first().proxyURL : null

    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: imageAtt
    });

    //Log
    try{
        bot.database;
        const guild = await bot.Guild.findOne({ 'guildId': message.guild.id });
        
        if (guild.log.status == "on" && message.channel.type == 'text') {
            let channel = message.guild.channels.cache.find(channel => channel.id === guild.log.channel);

            if (channel) {
                if(!user){
                    console.log("Channel:" + message.channel +" // Message" + message.cleanContent);
                }else{
                    let embed = new MessageEmbed()
                    .setTitle(":x: [Mensagem Deletada]")
                    .addField(`**Usuário:**`, message.member.user, true)
                    .addField(`**Channel:**`, message.channel, true)
                    if(message.cleanContent) embed.addField(`**Mensagem:**`, message.cleanContent)
                    .addField(`**Tag:**`, message.member.user.tag, true)
                    .addField(`**ID:**`, message.member.user.id, true)
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