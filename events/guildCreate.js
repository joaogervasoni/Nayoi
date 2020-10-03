const mongoose = require('mongoose');
var colors = require('colors');

module.exports = (bot, guild) => {
    try{
        const guildNew = new bot.Guild({
            _id: mongoose.Types.ObjectId(),
            name: guild.name,
            guildId: guild.id,
            memberCount: guild.memberCount,
            createdAt: guild.joinedAt,
            server: {
                lang: "pt-br",
                prefix: "n!",
                nsfw: "off"
            },
            welcome: {
                status: "off",
                msg: "{member}!!",
                channel: "",
                canvas: "off",
                canvasUrl: "off",
            },
            autorole: {
                status: "off",
                role: "",
            },
            log: {
                status: "off",
                channel: ""
            },
            twitch: {
                status: "off",
                channel: ""
            }
        });
        console.log(`[Join]`.brightMagenta + ` Name:${guild.name} Users:${guild.memberCount} id:${guild.id} Date:${new Date()}`.magenta)
        guildNew.save()

        guild.language = bot.locales.get("pt-br");
        guild.prefix = "n!";
    }catch(e){
        bot.error.errorReturn(e, null, "guildCreate")
    }
}