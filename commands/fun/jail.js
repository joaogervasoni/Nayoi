module.exports.run = async (bot, message, args, lang) => {
    try {
        let user = message.mentions.users.first();
        if (!user) user = message.member.user;

        userAvatar = user.avatarURL({ format: 'jpg' });

        const attachment = await bot.canvas().jail(userAvatar);
        return message.channel.send(attachment)
    } catch (e) {
        bot.error.errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "jail",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}