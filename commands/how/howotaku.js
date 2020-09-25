const { MessageEmbed } = require("discord.js");
const { errorReturn } = require("../../utils/functions.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        let user = message.mentions.members.first();
        let percent = Math.floor(Math.random() * 101);
        let msg;
        if (user){
            msg = `${user} ${lang.userIs} ${percent}% Otaku :flag_jp:`
        }else{
            msg = `${lang.youIs} ${percent}% Otaku :flag_jp:`
        }
    
        let embed = new MessageEmbed()
                    .setTitle(lang.embedTitle)
                    .setDescription(msg)
                    .setColor("#ffffff")
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "howotaku",
    type: "how"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}
