const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../../utils/functions.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        let user = message.mentions.members.first();
        let percent = Math.floor(Math.random() * 101);
        let msg;
        let emoji;

        if(percent < 50) emoji = ":slight_frown:";
        else if(percent > 50) emoji = ":grinning:"; 
        
        if (user) msg = `${user} ${lang.userIs} ${percent}% ${lang.how} ${emoji}`;
        else msg = `${lang.youIs} ${percent}% ${lang.how} ${emoji}`;

        let embed = new MessageEmbed()
                    .setTitle(lang.embedTitle)
                    .setDescription(msg)
                    .setColor(bot.baseColor)
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "howhappy",
    type: "how"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}