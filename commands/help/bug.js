const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, lang) =>  {
    try{
        const bug = args.join(" ");
        if(!bug) return message.reply(lang.returnNull)
    
        const bugDB = await bot.database.create("bug", {
            guildId: message.guild.id,
            user: message.member.user.id,
            date: new Date().getTime(),
            bug: bug
        })
        await bot.database.save(bugDB);
    
        const embed = new MessageEmbed()
        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/nayoi/nayoiHappy.gif?raw=true")
        .setTitle(lang.embedTitle)
        .setDescription(lang.embedDescription)
        .setFooter(lang.embedFooter)
        .setTimestamp()
        .setColor(bot.baseColor);
    
        return message.channel.send(embed);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "bug",
    type: "help"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}