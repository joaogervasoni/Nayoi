const {MessageEmbed} = require("discord.js");
const { returnNull } = require("../../utils/functions.js")
const mongoose = require("mongoose");
const Bug = require("../../models/bug");

module.exports.run = async (bot, message, args, lang) =>  {
    try{
        const bug = args.join(" ");
        if(returnNull(bug)) return message.reply(lang.returnNull)
    
        const bugDB = new Bug({
            _id: mongoose.Types.ObjectId(),
            guildId: message.guild.id,
            user: message.member.user.id,
            date: new Date().getTime(),
            bug: bug
        })
        await bugDB.save();
    
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