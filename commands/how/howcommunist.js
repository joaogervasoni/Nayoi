const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../../functions.js");

module.exports.run = (bot, message) => {
    try{
        let user = message.mentions.members.first()
        let percent = Math.floor(Math.random() * 101);
        let msg
        if (user){
            msg = `${user} é ${percent}% comunista :hammer_pick:`
        }else{
            msg = `Você é ${percent}% comunista :hammer_pick:`
        }

        let embed = new MessageEmbed()
                    .setTitle("Quão comunista vc é?")
                    .setDescription(msg)
                    .setColor("#cc0000")
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message)
    }
}

module.exports.help = {
    name: "howcommunist",
    type: "how"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}