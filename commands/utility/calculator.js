const {returnNull} = require("../../utils/functions.js");
const { evaluate } = require('mathjs')

module.exports.run = async (bot, message, args, lang) => {
    try{
        const calc = args.join("");
        if(returnNull(calc) || !isNaN(calc)) return message.reply(lang.helpReturn);
        let result;
        try{
            result = evaluate(args.join(""));
        }catch{
            return message.reply(lang.validResult);
        }
        
        return message.reply(`:scales: ${lang.returnResult} \`${result}\``);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "calculator",
    type: "utility",
    aliases: ["calc"]
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}