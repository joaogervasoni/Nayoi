const { errorReturn, formatId, returnNull } = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = (bot, message, args, lang) => {
    try{
        let channel = message.guild.channels.cache.get(formatId(args[0]));
        let msgSplit;

        if(channel){
            msgSplit = args.join(" ").slice(args[0].length).split("||");
        }
        else{
            channel = message.channel;
            msgSplit = args.join(" ").slice(0).split("||");
        }
        if(returnNull(msgSplit[1])) return message.reply(lang.undefinedDescription);

        let embed = new MessageEmbed()
        .setTitle(msgSplit[0])
        .setDescription(msgSplit[1])
        .setColor(bot.baseColor)
        return channel.send(embed)
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "sayembed",
    type: "utility"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
    ownerOnly: false
}