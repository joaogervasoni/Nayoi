const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args, lang) => {

    let cmd = args.join(" ").slice(0).toLowerCase();
    let cmds = bot.commands.get(cmd)
    let embed = new MessageEmbed()
    
    if(cmds){
        const infos = bot.langs.langHelp(message.guild.language.name, cmds.help.name);
        bot.langs.langParams(infos, bot.prefix, cmds.help.name)

        embed
        .setTitle(`${cmds.help.name.charAt(0).toUpperCase() + cmds.help.name.slice(1)}:`)
        .setDescription(`${infos.description}`)
        .setColor(bot.baseColor)
        if(infos.usability) embed.addField(lang.embedUsability, `${infos.usability}`)
        if(infos.additional) embed.addField(lang.embedAdditional, `${infos.additional}`)
        if(infos.others) embed.addField(lang.embedOthers, `${infos.others}`)
        return message.channel.send(embed)
    }
    else{
        embed
        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/nayoi/nayoiHelp.png?raw=true")
        .setTitle(lang.embedTitle)
        .setDescription(lang.embedDescription)
        .setColor(bot.baseColor)
        .addField(lang.embedField1_title, lang.embedField1_text)
        .addField(lang.embedField2_title, lang.embedField2_text)
        return message.channel.send(embed)
    }
}

module.exports.help = {
    name: "help",
    type: "help"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}