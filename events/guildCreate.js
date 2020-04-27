const {errorReturn} = require("../functions.js");
var colors = require('colors');
const mongoose = require('mongoose');

module.exports = (bot, guild) => {
    try{
        bot.database;

        const guildNew = new bot.Guild({
            _id: mongoose.Types.ObjectId(),
            name: guild.name,
            guildId: guild.id,
            memberCount: guild.memberCount,
            createdAt: guild.joinedAt,
            server: {
                nsfw: "off"
            },
            welcome: {
                status: "off",
                msg: "Bem-vindo {member}!!",
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
        });
        console.log(`Novo servidor !! Nome:${guild.name} id:${guild.id}`.magenta)
        guildNew.save()
    }catch(e){
        errorReturn(e, null, "guildCreate")
    }
}