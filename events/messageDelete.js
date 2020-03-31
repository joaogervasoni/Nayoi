const mongoose = require("mongoose");
const {RichEmbed} = require("discord.js");
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
            let channel = message.guild.channels.find(channel => channel.id === guild.logChannel)
            if (channel != null) {
                let embed = new RichEmbed()
                    .addField(":x: [Mensagem Deletada]", `**Mensagem:** ${message.cleanContent} **Usuário:** ${message.member.user} **Channel:** ${message.channel}`)
                channel.send(embed)
            }
        }
    }catch(e){
        let channel = message.guild.channels.find(channel => channel.id === guild.logChannel)
        errorReturn(e, channel)
    }
    
}