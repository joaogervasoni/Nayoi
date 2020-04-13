const {errorReturn} = require("../../functions.js");
const {MessageEmbed} = require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    try{
        let msg = args.join(" ").slice(0);
        let channelId = msg.slice(2,20);

        //say #chat msg
        if(channelId.length == "18" && message.guild.channels.cache.get(channelId)){
            
            let guildMention = message.guild.channels.cache.get(channelId)
            let msgMention = args.join(" ").slice(22)

            let msgSplit = msgMention.split("||");

            let embed = new MessageEmbed()
            .setTitle(msgSplit[0])
            .setDescription(msgSplit[1])
            .setColor(bot.baseColor)
            
            return guildMention.send(embed)
        } 
        
        //say msg base
        let msgSplit = msg.split("||");

        let embed = new MessageEmbed()
        .setTitle(msgSplit[0])
        .setDescription(msgSplit[1])
        .setColor(bot.baseColor)
 
        return message.channel.send(embed)   
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "sayembed",
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