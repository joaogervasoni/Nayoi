const mongoose = require("mongoose");
const {MessageEmbed} = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, message) => {
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });

    //Log
    try{
        mongoose.connect(`${bot.mongodb}`);
        const guild = await bot.Guild.findOne({ 'guildId': message.guild.id });
        
        if (guild.log == "on" && message.channel.type == 'text') {
            let channel = message.guild.channels.cache.find(channel => channel.id === guild.logChannel)
            if (channel != null) {
                let embed = new MessageEmbed()
                    .setTitle(":x: [Mensagem Deletada]")
                    .addField(`**Usuário:**`, message.member.user, true)
                    .addField(`**Channel:**`, message.channel, true)
                    .addField(`**Mensagem:**`, message.cleanContent)
                    .addField(`**Tag:**`, message.member.user.tag, true)
                    .addField(`**ID:**`, message.member.user.id, true)
                    .setTimestamp()
                    
                return channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, "messageDelete")
    }
}