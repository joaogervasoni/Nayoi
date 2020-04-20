const {MessageEmbed} = require("discord.js");
const {upperCaseFirst} = require("../functions.js");
const { prefix } = require("../botconfig.json");

module.exports.run = (bot, message, args) => {

    let args2 = args.join(" ").slice(0).toLowerCase();
    let cmds = bot.commands;
    let embed = new MessageEmbed()
    let emojisList = [["automation", ":gear:"], ["utilidade", ":gem:"], ["how", ":peach:"], ["adm", ":shield:"], ["fun", ":performing_arts:"], ["outros", ":kaaba:"], ["ajuda", ":grey_question:"]];
    var emojis = new Map(emojisList);

    if(args2){

        let description = ("`Para mais informações use " + prefix +"help nomedocomando`\n\n")
        cmds.forEach(element => {
            if(element.help.type === args2){
                if(element.help.description !== undefined){
                    description = `${description} **${upperCaseFirst(element.help.name)}** // ${element.help.description}\n`;
                }else{
                    description = `${description} **${upperCaseFirst(element.help.name)}** //\n`;
                } 
            }
        });
        embed
        .setTitle(`${emojis.get(args2)} ${upperCaseFirst(args2)} comandos`)
        .setDescription(description)
        return message.channel.send(embed)

    }else{
        let types = new Map();

        embed
        .setTitle(`${bot.user.username} comandos`)
        .setColor(bot.baseColor)
        .setDescription("Exemplo: ```"+prefix+"commands <grupo>```", true)
    
        cmds.forEach(element => {
    
            if (types.get(element.help.type)){
                types.set(element.help.type, types.get(element.help.type)+1)
            }else
            {
                if(element.help.type !== undefined) types.set(element.help.type, +1)
            }
        });
    
        for (var [key, value] of types) {
            let emoji = emojis.get(key);
            embed
            .addField(`${emoji} ${upperCaseFirst(key)}`, `${value} comandos`, true)
        }

        return message.channel.send(embed)
    }
}

module.exports.help = {
    name: "commands",
    type: "ajuda"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}