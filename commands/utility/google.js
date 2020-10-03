const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message , args, lang) => {
    try{
        if(args.length === 0) return message.reply(lang.helpReturn)
        const search = args.join('+')
    
        const embed = new MessageEmbed()
        .setTitle("Google")
        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/others/magnifying.png?raw=true")
        .setDescription(`https://www.google.com/search?q=${search}`)
        .setColor(bot.baseColor)
        .setTimestamp();
    
        return message.channel.send(embed);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "google",
    type: "utility",
    aliases: []
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}