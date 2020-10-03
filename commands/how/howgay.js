const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        let user = message.mentions.members.first();
        let percent = Math.floor(Math.random() * 101);
        let msg;
        if (user){
            msg = `${user} ${lang.userIs} ${percent}% gay :rainbow_flag:`
        }else{
            msg = `${lang.youIs} ${percent}% gay :rainbow_flag:`
        }

        let embed = new MessageEmbed()
                    .setTitle(lang.embedTitle)
                    .setDescription(msg)
                    .setColor("#ff3399")
        return message.channel.send(embed);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "howgay",
    type: "how"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}