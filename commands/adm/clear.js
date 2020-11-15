module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        if(!cmd || isNaN(cmd)) return message.reply(lang.helpReturn);
        if(cmd > 50) return message.reply(lang.returnLimit);

        await message.channel.bulkDelete(parseInt(cmd) + 1);
        
        return message.reply(`\`${cmd}\` ${lang.returnDeleted}`);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "clear",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}