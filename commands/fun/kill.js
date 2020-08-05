const { errorReturn, randomCollection } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let user = message.mentions.users.first()
        if (!user) return message.reply(lang.helpReturn);

        const msg = user.username + " " + randomCollection(bot.lists, this.help.name);
    
        return message.channel.send(msg)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "kill",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}