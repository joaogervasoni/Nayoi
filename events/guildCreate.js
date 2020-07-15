const {errorReturn} = require("../utils/functions.js");
var colors = require('colors');
const mongoose = require('mongoose');

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
        console.log(`Novo servidor !! Nome:${guild.name} id:${guild.id}`.magenta)
        guildNew.save()

        guild.language = bot.locales.get("pt-br");
    }catch(e){
        errorReturn(e, null, "guildCreate")
    }
}