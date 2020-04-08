const mongoose = require("mongoose");
const {MessageEmbed} = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, oldMessage, newMessage) => {
    
    //Log
    if(oldMessage.content == newMessage.content) {
        return
    }
    try{
        mongoose.connect(`${bot.mongodb}`);
        const guild = await bot.Guild.findOne({ 'guildId': oldMessage.guild.id });
        
        if (guild.log == "on" && oldMessage.channel.type == 'text') {
            let channel = oldMessage.guild.channels.cache.find(channel => channel.id === guild.logChannel)
            if (channel != null) {
                let embede = new MessageEmbed()
                    .setTitle(":grey_question: [Mensagem Editada]")
                    .addField(`**Usuário:**`, newMessage.author, true)
                    .addField(`**Channel:**`, newMessage.channel, true)
                    .addField(`**Mensagem Antiga:**`, oldMessage.content)
                    .addField(`**Mensagem Nova:**`, newMessage.content)
                    .addField(`**Tag:**`, newMessage.author.tag, true)
                    .addField(`**ID:**`, newMessage.author.id, true)
                    .setTimestamp()

                return channel.send(embede)
            }
        }
    }catch(e){
        errorReturn(e, null, "messageUpdate")
    }
}