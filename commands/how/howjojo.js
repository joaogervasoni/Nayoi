const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../../functions.js");

module.exports.run = (bot, message) => {
    try{
        let user = message.mentions.members.first()
        let percent = Math.floor(Math.random() * 101);
        let msg
        if (user){
            msg = `${user} é ${percent}% JoJo Fag :muscle:`
        }else{
            msg = `Você é ${percent}% JoJo Fag :muscle:`
        }

        let embed = new MessageEmbed()
                    .setTitle("Quão JoJo Fag vc é?")
                    .setDescription(msg)
                    .setColor("#99ff99")
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message)
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