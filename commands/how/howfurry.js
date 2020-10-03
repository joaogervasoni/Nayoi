const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        let user = message.mentions.members.first();
        let percent = Math.floor(Math.random() * 101);
        let msg;
        var emoji = [":dog:",":cat:",":mouse:",":hamster:",":rabbit:",":fox:",":bear:",":panda_face:",":koala:",":tiger:",":lion_face:",":cow:",":pig:",":frog:",":hatched_chick:",":monkey_face:",":boar:",":wolf:"];
        emoji = emoji[(Math.random() * emoji.length) | 0];
        
        if (user){
            msg = `${user} ${lang.userIs} ${percent}% furry ${emoji}`
        }else{
            msg = `${lang.youIs} ${percent}% furry ${emoji}`
        }

        let embed = new MessageEmbed()
                    .setTitle(lang.embedTitle)
                    .setDescription(msg)
                    .setColor("#6699ff")
        return message.channel.send(embed);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "howfurry",
    type: "how"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}