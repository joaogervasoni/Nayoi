const { errorReturn, formatId } = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = (bot, message, args) => {
    try{
        let mutetime = args[0];
        let channel = message.guild.channels.cache.get(formatId(args[0]))
        mutetime = ms(mutetime);
    
        if(channel){
            let msgSplit = args.join(" ").slice(args[0].length).split("||");
            let embed = new MessageEmbed()
            .setTitle(msgSplit[0])
            .setDescription(msgSplit[1])
            .setColor(bot.baseColor)
            return channel.send(embed)
        }
        else{
            let msgSplit = args.join(" ").slice(0).split("||");
            let embed = new MessageEmbed()
            .setTitle(msgSplit[0])
            .setDescription(msgSplit[1])
            .setColor(bot.baseColor)
            return message.channel.send(embed)
        }
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "sayembed",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: [],
    ownerOnly: false
}