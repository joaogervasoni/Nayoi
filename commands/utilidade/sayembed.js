const { errorReturn, formatId } = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const ms = require("ms");

module.exports.run = (bot, message, args) => {
    try{
        let mutetime = args[0];
        let channel = message.guild.channels.cache.get(formatId(args[0]))
        mutetime = ms(mutetime);
    
        if(channel){
            let msgSplit = args.join(" ").slice(args[0].length).split("||");
            let embed = new MessageEmbed()
            .setTitle(msgSplit[0])
            .setDescription(msgSplit[1])
            .setColor(bot.baseColor)
            return channel.send(embed)
        }
        else{
            let msgSplit = args.join(" ").slice(0).split("||");
            let embed = new MessageEmbed()
            .setTitle(msgSplit[0])
            .setDescription(msgSplit[1])
            .setColor(bot.baseColor)
            return message.channel.send(embed)
        }
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "sayembed",
    description: "Manda uma msg embed pelo Bot",
    usability: "Pode ser utilizando usando `"+prefix+"sayembed título || msgaqui`\n"
    +"Também pode ser mandando em um chat diferente usando`"+prefix+"sayembed #channel título || msgaqui`\n"
    +"**Os comandos say e sayembed utilizam os mesmos parâmetros**\n",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: [],
    ownerOnly: false
}