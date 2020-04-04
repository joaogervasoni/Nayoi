const mongoose = require("mongoose")
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");
var colors = require('colors');

module.exports = (bot, guild) => {
    try{
        mongoose.connect(`${bot.mongodb}`);

        const guildNew = new bot.Guild({
            _id: mongoose.Types.ObjectId(),
            name: guild.name,
            guildId: guild.id,
            memberCount: guild.memberCount,
            createdAt: guild.joinedAt,
            channel: "none",
            welcome: "off",
            welcomeMsg: "Bem-vindo {member}!!",
            welcomeChannel: "Bem-vindo",
            welcomeCanvas: "off",
            log: "off",
            logChannel: "",
            autorole: "off",
            autoroleRole: "",
            nsfw: "off"
        });
        console.log(`Novo servidor !! Nome:${guild.name} id:${guild.id}`.magenta)
        guildNew.save()
    }catch(e){
        errorReturn(e, "guildCreate")
    }
}