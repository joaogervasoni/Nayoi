const { errorReturn, returnNull } = require("../../utils/functions.js");
const { tenorApi } = require("../../botconfig.json");
const fetch = require("node-fetch");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0]
        
        const gif = await fetch(`https://api.tenor.com/v1/search?q=${cmd}&key=${tenorApi}&limit=1`).then(res => res.json());
        if(returnNull(gif.results[0]) || returnNull(gif)) return message.reply(lang.returnNull)

        let first = gif.results[0];
        const embed = new MessageEmbed()
        .setTitle(`${lang.embedTitle} ${cmd}`)
        .setThumbnail("https://www.gstatic.com/tenor/web/attribution/PB_tenor_logo_blue_vertical.png")
        .setImage(first.media[0].tinygif.url)
        .setColor(bot.baseColor)
        .setFooter("Via Tenor")

        return message.channel.send(embed)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "gif",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}