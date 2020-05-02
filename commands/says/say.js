const {errorReturn} = require("../../functions.js");
const { prefix } = require("../../botconfig.json");
const ms = require("ms");

module.exports.run = (bot, message, args) => {
    try{
        let mutetime = args[0];
        mutetime = ms(mutetime);
        
        if(!isNaN(mutetime) && isNaN(args[0].charAt(args[0].length-1))){
            
            if(message.guild.channels.cache.get(args[1].slice(2,20))){
                let guildMention = message.guild.channels.cache.get(args[1].slice(2,20));
    
                setTimeout(function(){
                    return guildMention.send(args.join(" ").slice(args[0].length + args[1].length + 1));
                }, mutetime);

            }
            else{
                setTimeout(function(){
                    return message.channel.send(args.join(" ").slice(args[0].length));
                }, mutetime);
            }
        }
        else{
            if(message.guild.channels.cache.get(args[0].slice(2,20))){
                let guildMention = message.guild.channels.cache.get(args[0].slice(2,20));
    
                return guildMention.send(args.join(" ").slice(args[0].length));
            }
            else{
                return message.channel.send(args.join(" ").slice(0));
            }
        }
          
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
    additional: "Também é possivel adicionar tempo para uma msg ser enviada\n"
    +"Utilize `"+prefix+"say 10s msgaqui`\n"
    +"No caso de ter um channel `"+prefix+"say 10s #channel msgaqui`",
    others: "O tempo deve ser expecificado com uma letra após o número para ser considerado um tempo valido\n"
    +"**Exemplos:** `1s(seg) | 1m (min) | 1h (hora)`",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}