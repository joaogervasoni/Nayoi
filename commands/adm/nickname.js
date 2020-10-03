const {returnNull} = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let user = message.mentions.members.first();
        let nick = args[1];
        if (returnNull(user)){
            user = message.member;
            nick = args[0];
        }
    
        user.setNickname(nick);
    
        return message.channel.send(lang.returnSuccess);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "nickname",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["MANAGE_NICKNAMES", "CHANGE_NICKNAME"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}