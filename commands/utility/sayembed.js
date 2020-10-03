const { formatId, returnNull, limitLength } = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");

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
        .setTitle(limitLength(msgSplit[0], "title"))
        .setDescription(msgSplit[1])
        .setColor(bot.baseColor)
        return channel.send(embed)
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
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