const { MessageEmbed } = require("discord.js");

module.exports = async (bot, message) => {
    if(!message.author) return
    let imageAtt = message.attachments.first() ? message.attachments.first().proxyURL : null
    let cleanEmbed = message.embeds != 0 ? new MessageEmbed(message.embeds[0]) : null

    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: imageAtt,
        embed: cleanEmbed
    });

    try{
        const guild = await bot.database.findOne("guild", { 'guildId': message.guild.id });
        if (guild.log.status == "on") {
            let channel = message.guild.channels.cache.get(guild.log.channel);

            if (channel) {
                const lang = await bot.langs.langReturn(message.guild.language, "messageDelete", "event");

                let embed = new MessageEmbed()
                .setColor(bot.baseColor)
                .setTitle(`:x: [${lang.embedTitle}]`)
                .addField(`**${lang.fieldUser}**`, message.author, true)
                .addField(`**${lang.fieldChannel}**`, message.channel, true)
                .addField(`**${lang.fieldTag}**`, message.author.tag, true)
                .setFooter(`id: ${message.author.id}`)
                .setTimestamp();
                if(message.cleanContent) embed.addField(`**${lang.fieldMsg}**`, message.cleanContent);
                if(cleanEmbed) embed.addField(`**Embed:**`, `\`Title:\` ${cleanEmbed.description} || \`Description:\` ${cleanEmbed.title}`);
                if (imageAtt) embed.setImage(imageAtt);
            
                return channel.send(embed)
            }
        }
    }catch(e){
        bot.error.errorReturn(e, null, "messageDelete")
    }
}