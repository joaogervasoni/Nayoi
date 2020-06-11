const { errorReturn, formatId } = require("../../utils/functions.js");
const { prefix } = require("../../botconfig.json");
const ms = require("ms");

module.exports.run = (bot, message, args) => {
    try{
        let mutetime = args[0];
        let channel = message.guild.channels.cache.get(formatId(args[0]))
        mutetime = ms(mutetime);
        
        if(channel){
            return channel.send(args.join(" ").slice(args[0].length));
        }
        else{
            return message.channel.send(args.join(" ").slice(0));
        }
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "say",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}