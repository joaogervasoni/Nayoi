const { prefix } = require("../../botconfig.json");
const {errorReturn, returnNull} = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];

        if(returnNull(cmd) || isNaN(cmd)) return message.reply(lang.helpReturn);
        if(cmd > 50) return message.reply(lang.returnLimit);

        await message.channel.bulkDelete(cmd+1);
        
        return message.reply(`\`${cmd}\` ${lang.returnDeleted}`);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "clear",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}