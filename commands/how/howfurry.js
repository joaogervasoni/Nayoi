const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../../utils/functions.js");

module.exports.run = (bot, message) => {
    try{
        let user = message.mentions.members.first();
        let percent = Math.floor(Math.random() * 101);
        let msg;
        var emoji = [":dog:",":cat:",":mouse:",":hamster:",":rabbit:",":fox:",":bear:",":panda_face:",":koala:",":tiger:",":lion_face:",":cow:",":pig:",":frog:",":hatched_chick:",":monkey_face:",":boar:",":wolf:"];
        emoji = emoji[(Math.random() * emoji.length) | 0];
        
        if (user){
            msg = `${user} é ${percent}% furry ${emoji}`
        }else{
            msg = `Você é ${percent}% furry ${emoji}`
        }

        let embed = new MessageEmbed()
                    .setTitle("Quão furry vc é?")
                    .setDescription(msg)
                    .setColor("#6699ff")
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message, this.help.name)
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