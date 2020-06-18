const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args, lang) => {

    let cmd = args.join(" ").slice(0).toLowerCase();
    let embed = new MessageEmbed()
    let cmds = bot.commands.get(cmd)
    //if(cmds && cmds.help.description != null){
    if(cmds){
        const infos = this.returnCommandLang(message, cmds.help.name);
        langParams(infos, bot.prefix, cmds.help.name)

        embed
        .setTitle(`${cmds.help.name.charAt(0).toUpperCase() + cmds.help.name.slice(1)}:`)
        .setDescription(`${infos.description}`)
        .setColor(bot.baseColor)
        if(infos.usability) embed.addField("Usabilidade", `${infos.usability}`)
        if(infos.additional) embed.addField("Comandos adicionais", `${infos.additional}`)
        if(infos.others) embed.addField("Outros", `${infos.others}`)
        return message.channel.send(embed)
    }
    else{
        embed
        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/YaniHelp.png?raw=true")
        .setTitle("Ajuda:")
        .setDescription("Aqui você pode encontrar ajuda sobre qualquer comando ou funcionalidade minha !!!")
        .setColor(bot.baseColor)
        .addField("Usabilidade", "Para pesquisar digite `"+bot.prefix+"help nomedocomando`\n"
        +"Caso esteja buscando pela lista de comandos digite `"+bot.prefix+"commands`\n"
        +"Espero que encontre o que procura :heart:")
        .addField("Outros", "Para mais informações acesse: http://nayoi.com")
        return message.channel.send(embed)
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
    name: "help",
    type: "ajuda"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}