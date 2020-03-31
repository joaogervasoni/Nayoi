const mongoose = require("mongoose")
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = (bot, guild) => {
    mongoose.connect(`${bot.mongodb}`);

    try{
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
            log: "off",
            logChannel: "",
            autorole: "off",
            autoroleRole: "",
            nsfw: "off"
        });
    
        guildNew.save()
    }catch(e){
        errorReturn(e)
    }
}