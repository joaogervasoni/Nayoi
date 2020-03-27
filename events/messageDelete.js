const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports = (bot, message) => {
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });

    //log
    mongoose.connect(`${bot.mongodb}`);
    bot.Guild.findOne({'guildId': message.guild.id }, (err, guild) => {

        if (guild.log == "on" && message.channel.type == 'text') {

            let channel = message.guild.channels.find(channel => channel.id === guild.logChannel)
            if (channel != null) {
                let embed = new Discord.RichEmbed()
                    .addField(":x: [Message Delete]", `**Message:** ${message.cleanContent} **User:** ${message.member.user} **Channel:** ${message.channel}`)
                channel.send(embed)
            }
        }
    })
}