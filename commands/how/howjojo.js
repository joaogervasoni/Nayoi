const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        let user = message.mentions.members.first();
        let percent = Math.floor(Math.random() * 101);
        let msg;
        if (user){
            msg = `${user} ${lang.userIs} ${percent}% JoJo Fag :muscle:`
        }else{
            msg = `${lang.youIs} ${percent}% JoJo Fag :muscle:`
        }

        let embed = new MessageEmbed()
                    .setTitle(lang.embedTitle)
                    .setDescription(msg)
                    .setColor("#99ff99")
        return message.channel.send(embed);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "howjojo",
    type: "how"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}