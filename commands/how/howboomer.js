const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../../functions.js");

module.exports.run = (bot, message) => {
    try{
        let user = message.mentions.members.first()
        let percent = Math.floor(Math.random() * 101);
        let msg
        if (user){
            msg = `${user} é ${percent}% boomer :older_man:`
        }else{
            msg = `Você é ${percent}% boomer :older_man:`
        }

        let embed = new MessageEmbed()
                    .setTitle("Quão Boomer vc é?")
                    .setDescription(msg)
                    .setColor("#ffff00")
        return message.channel.send(embed);
    }catch(e){
        errorReturn(e, message)
    }
}

module.exports.help = {
    name: "howboomer"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}