const { errorReturn, returnNull } = require("../../functions.js");
const { prefix, tenorApi } = require("../../botconfig.json");
const fetch = require("node-fetch");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    try{
        const cmd = args[0]
        
        const gif = await fetch(`https://api.tenor.com/v1/search?q=${cmd}&key=${tenorApi}&limit=1`).then(res => res.json());
        if(returnNull(gif.results[0]) || returnNull(gif)) return message.reply("Não encontrei nenhum gif :worried:")

        let first = gif.results[0];
        const embed = new MessageEmbed()
        .setTitle("Primeiro resultado de "+cmd)
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
    description: "Traz o primeiro gif do tenor",
    usability: "Pode ser utilizado de maneira simples `"+prefix+"gif nomedogif`\n",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}