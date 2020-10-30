const { MessageEmbed } = require("discord.js");

module.exports = class {
    constructor(client){
        this.bot = client;
    }

    async run(oldMessage, newMessage){
        if(oldMessage.content == newMessage.content || newMessage.content === "") return
        if(!oldMessage.author || !newMessage.author) return
    
        try{
            const guild = await this.bot.database.findOne("guild", { 'guildId': oldMessage.guild.id });
            
            if (guild.log.status == "on") {
                let channel = oldMessage.guild.channels.cache.find(channel => channel.id === guild.log.channel)
                
                if (channel) {
                    const lang = await this.bot.langs.langReturn(oldMessage.guild.language, "messageUpdate", "event");
                    
                    let embed = new MessageEmbed()                
                    .setTitle(`:grey_question: [${lang.embedTitle}]`)
                    .addField(`**${lang.fieldUser}**`, newMessage.author, true)
                    .addField(`**${lang.fieldChannel}**`, newMessage.channel, true)
                    if(oldMessage.cleanContent) embed.addField(`**${lang.fieldMsgOld}**`, oldMessage.content)
                    if(newMessage.cleanContent) embed.addField(`**${lang.fieldMsgNew}**`, newMessage.content)
                    .addField(`**${lang.fieldTag}**`, newMessage.author.tag, true)
                    .addField(`**ID:**`, newMessage.author.id, true)
                    .setColor(this.bot.baseColor)
                    .setTimestamp()
    
                    return channel.send(embed)
                }
            }
        }catch(e){
            this.bot.error.errorReturn(e, null, "messageUpdate")
        }
    }
}