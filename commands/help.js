const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args) => {

    let cmd = args.join(" ").slice(0).toLowerCase();
    let embed = new MessageEmbed()

    let cmds = bot.commands.get(cmd)
    if(cmds && cmds.help.description != null){
        embed
        .setTitle(`${cmds.help.name.charAt(0).toUpperCase() + cmds.help.name.slice(1)}:`)
        .setDescription(`${cmds.help.description}`)
        .setColor(bot.baseColor)
        if(cmds.help.usability) embed.addField("Usabilidade", `${cmds.help.usability}`)
        if(cmds.help.additional) embed.addField("Comandos adicionais", `${cmds.help.additional}`)
        if(cmds.help.others) embed.addField("Outros", `${cmds.help.others}`)
        return message.channel.send(embed)
    }
    else{
        embed
        .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniHelp.png?raw=true")
        .setTitle("Ajuda:")
        .setDescription("Aqui você pode encontrar ajuda sobre qualquer comando ou funcionalidade minha !!!")
        .setColor(bot.baseColor)
        .addField("Usabilidade", "Para pesquisar digite `"+bot.prefix+"help nomedocomando`\n"
        +"Caso esteja buscando pela lista de comandos digite `"+bot.prefix+"commands`\n"
        +"Espero que encontre o que procura :heart:")
        .addField("Outros", "Para mais informações acesse: https://github.com/Zaetic/Yani")
        return message.channel.send(embed)
    }
}

module.exports.help = {
    name: "help",
    description: "Traz informações sobre comandos",
    type: "ajuda"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}