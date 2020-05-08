const { errorReturn } = require("../../functions.js");
const { prefix } = require("../../botconfig.json");
const isImage = require('is-image');

module.exports.run = async (bot, message, args) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];
        bot.database;

        if(cmd === "bn" || cmd === "banner"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.welcome.canvas === "off"){ guild.welcome.canvas = "on"; }else{ guild.welcome.canvas = "off"; }
        
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Banner de bem-vindo agora esta `"+guild.welcome.canvas+"` :sunglasses:");
            });
        }
        else if(cmd === "bnc" || cmd === "bannercustom"){
            let url = subcmd;
            
            if (isImage(url)){
                const guild = await bot.Guild.findOne({'guildId': message.guild.id});
                guild.welcome.canvasUrl = url;
                guild.save(function (err){
                    if(err) return errorReturn(err, message, this.help.name);
                    if(!err) return message.channel.send("Imagem trocada `obs: As dimensões recomendadas são 1000x360!!`")
                })
            }
            else if(!isImage(url)){
                return message.channel.send("Não foi encontrada uma imagem valida :moyai: `A imagem deve terminar com uma extensão valida de imagem (png, jpg e outras)`!!")
            }
        }
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "banner",
    description: "`"+prefix+"banner bn` - Ativa/Desativa o banner de bem-vindo\n"
    +"`"+prefix+"banner bnc url` - Troca imagem do banner de boas-vindas\n",
    others: "As dimensões do banner de boas-vindas é de **1000x360**",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}