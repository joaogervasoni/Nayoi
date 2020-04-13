const {errorReturn} = require("../../functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    try{
        let msg = args.join(" ").slice(0);
        let channelId = msg.slice(2,20);

        //say #chat msg
        if(channelId.length == "18" && message.guild.channels.cache.get(channelId)){
            let guildMention = message.guild.channels.cache.get(channelId)
            let msgMention = args.join(" ").slice(22)
            return guildMention.send(msgMention)
        } 

        //say msg
        return message.channel.send(msg)   
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "say",
    description: "Manda uma msg pelo Bot",
    usability: "Pode ser utilizando usando `"+prefix+"say msgaqui`\n"
    +"Também pode ser mandando em um chat diferente usando`"+prefix+"say #channel msgaqui`\n"
    +"**Os comandos say e sayembed utilizam os mesmos parâmetros**\n",
    additional: "",
    others: ""
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}