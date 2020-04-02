const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../../functions.js");

module.exports.run = (bot, message) => {
    try{
        let user = message.mentions.members.first()
        let percent = Math.floor(Math.random() * 101);
        let msg
        if (user){
            msg = `${user} é ${percent}% gay :rainbow_flag:`
        }else{
            msg = `Você é ${percent}% gay :rainbow_flag:`
        }

        let embed = new MessageEmbed()
                    .setTitle("Quão gay vc é?")
                    .setDescription(msg)
                    .setColor("pink")
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message)
    }
}

module.exports.help = {
    name: "howgay"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}