const {MessageEmbed} = require("discord.js");
const {upperCaseFirst} = require("../utils/functions.js");
const { prefix } = require("../botconfig.json");

module.exports.run = (bot, message, args, lang) => {

    let args2 = args.join(" ").slice(0).toLowerCase();
    let cmds = bot.commands;
    let embed = new MessageEmbed()
    let emojisList = [["automation", ":gear:"], ["utilidade", ":gem:"], ["how", ":peach:"], ["adm", ":shield:"], ["fun", ":performing_arts:"], ["outros", ":kaaba:"], ["ajuda", ":grey_question:"]];
    var emojis = new Map(emojisList);

    let exist 
    cmds.some(element => { if(element.help.type == args2) exist = 1;}); 

    if(args2 && exist){

        let description = ("`Para mais informações use " + prefix +"help nomedocomando`\n\n")
        cmds.forEach(element => {
            if(element.help.type === args2){
                const infos = this.returnCommandLang(message, element.help.name);
                langParams(infos, bot.prefix, element.help.name)
                if(infos.description !== undefined){
                    description = `${description} **${upperCaseFirst(element.help.name)}** // ${infos.description}\n`;
                }else{
                    description = `${description} **${upperCaseFirst(element.help.name)}** //\n`;
                } 
            }
        });
        embed
        .setTitle(`${emojis.get(args2)} ${upperCaseFirst(args2)} comandos`)
        .setDescription(description)
        return message.channel.send(embed)

    }
    else if(!args2 && !exist){

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
    }else{
        embed
        .setTitle(`Comando não encontrado :thinking:`)
        .setColor(bot.baseColor)
        .setDescription("**Utilize:** `"+prefix+"commands` para ver os comandos", true)

        return message.channel.send(embed);
    }
}

const langParams = (str, prefix, command) => {
    for (const key in str) {
        if (str.hasOwnProperty(key)) {
            str[key] = str[key].replace(/{prefix}/g, prefix);
            str[key] = str[key].replace(/{cmdName}/g, command);
        }
    }
}

exports.returnCommandLang = function(message, name){
    let infos = message.guild.language.commands.find(element => element.name === name).help;
    return infos
}

module.exports.help = {
    name: "commands",
    type: "ajuda",
    aliases: ["cmd"]
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}