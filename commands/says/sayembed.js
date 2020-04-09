const {errorReturn} = require("../../functions.js");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    try{
        let msg = args.join(" ").slice(0);
        let channelId = msg.slice(2,20);

        //say #chat msg
        if(channelId.length == "18" && message.guild.channels.cache.get(channelId)){
            
            let guildMention = message.guild.channels.cache.get(channelId)
            let msgMention = args.join(" ").slice(22)

            let msgSplit = msgMention.split("||");

            let embed = new MessageEmbed()
            .setTitle(msgSplit[0])
            .setDescription(msgSplit[1])
            .setColor(bot.baseColor)
            
            return guildMention.send(embed)
        } 
        
        //say msg base
        let msgSplit = msg.split("||");

        let embed = new MessageEmbed()
        .setTitle(msgSplit[0])
        .setDescription(msgSplit[1])
        .setColor(bot.baseColor)
 
        return message.channel.send(embed)   
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "sayembed"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}