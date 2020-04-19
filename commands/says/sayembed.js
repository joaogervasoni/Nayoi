const {errorReturn} = require("../../functions.js");
const {MessageEmbed} = require("discord.js");
const { prefix } = require("../../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    try{
        let mutetime = args[0];
        mutetime = ms(mutetime);
        
        if(!isNaN(mutetime) && isNaN(args[0].charAt(args[0].length-1))){
            
            if(message.guild.channels.cache.get(args[1].slice(2,20))){
                let guildMention = message.guild.channels.cache.get(args[1].slice(2,20));
                let msgSplit = args.join(" ").slice(args[0].length + args[1].length + 1).split("||");

                setTimeout(function(){
                    let embed = new MessageEmbed()
                    .setTitle(msgSplit[0])
                    .setDescription(msgSplit[1])
                    .setColor(bot.baseColor)
                    
                    return guildMention.send(embed)
                }, mutetime);

            }
            else{
                let msgSplit = args.join(" ").slice(args[0].length).split("||");
                setTimeout(function(){
                    let embed = new MessageEmbed()
                    .setTitle(msgSplit[0])
                    .setDescription(msgSplit[1])
                    .setColor(bot.baseColor)
                    return message.channel.send(embed)
                }, mutetime);
            }
        }
        else{

            if(message.guild.channels.cache.get(args[0].slice(2,20))){
                let guildMention = message.guild.channels.cache.get(args[0].slice(2,20));
                
                let msgSplit = args.join(" ").slice(args[0].length).split("||");

                let embed = new MessageEmbed()
                .setTitle(msgSplit[0])
                .setDescription(msgSplit[1])
                .setColor(bot.baseColor)
                return guildMention.send(embed)
            }
            else{
                let msgSplit = args.join(" ").slice(0).split("||");
                let embed = new MessageEmbed()
                .setTitle(msgSplit[0])
                .setDescription(msgSplit[1])
                .setColor(bot.baseColor)
                return message.channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "sayembed",
    description: "Manda uma msg embed pelo Bot",
    usability: "Pode ser utilizando usando `"+prefix+"sayembed título || msgaqui`\n"
    +"Também pode ser mandando em um chat diferente usando`"+prefix+"sayembed #channel título || msgaqui`\n"
    +"**Os comandos say e sayembed utilizam os mesmos parâmetros**\n",
    additional: "Também é possivel adicionar tempo para uma msg ser enviada\n"
    +"Utilize `"+prefix+"sayembed 10s título || msgaqui`\n"
    +"No caso de ter um channel `"+prefix+"sayembed 10s #channel título || msgaqui`",
    others: "O tempo deve ser expecificado com uma letra após o número para ser considerado um tempo valido\n"
    +"**Exemplos:** `1s(seg) | 1m (min) | 1h (hora)`"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}