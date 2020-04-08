const mongoose = require("mongoose");
const {MessageEmbed} = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
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
        mongoose.connect(`${bot.mongodb}`);
        const guild = await bot.Guild.findOne({ 'guildId': message.guild.id });
        
        if (guild.log == "on" && message.channel.type == 'text') {
            let channel = message.guild.channels.cache.find(channel => channel.id === guild.logChannel);

            if (channel != null) {
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
    }catch(e){
        errorReturn(e, null, "messageDelete")
    }
}