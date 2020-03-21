const mongoose = require("mongoose")
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports = (bot, guild) => {
    mongoose.connect(`${bot.mongodb}`);

    const guildNew = new bot.Guild({
        _id: mongoose.Types.ObjectId(),
        name: guild.name,
        guildId: guild.id,
        memberCount: guild.memberCount,
        createdAt: guild.joinedAt,
        channel: "none",
        welcome: "off",
        welcomeMsg: "Welcome {member}!!",
        welcomeChannel: "welcome",
        log: "off",
        logChannel: "",
        nsfw: "off"
    });

    guildNew.save().then(result => console.log(result)).catch(err => console.log(err));
}