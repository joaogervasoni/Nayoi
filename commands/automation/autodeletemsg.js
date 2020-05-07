const { errorReturn, formatChannelId } = require("../../functions.js");
const { prefix } = require("../../botconfig.json");
const mongoose = require('mongoose');
const AutoDeleteMsg = require("../../models/autodeletemsg");


module.exports.run = async (bot, message, args) => {
    try{
        //autodeletemsg on #channel
        bot.database;
        const cmd = args[0];
        let subcmd = formatChannelId(args[1]);
        if(!cmd) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        let chat = await message.guild.channels.cache.find(chat => subcmd, `id`);
        if (!chat) return message.reply("Não encontrei nenhum canal :worried:");

        if(cmd === "on"){
            let findChannel = await AutoDeleteMsg.findOne({ 'channelId': subcmd });
            
            if(findChannel != null){
                if(findChannel.config.status === "on") message.channel.send("Já existe, não foi salva");
            
                if(findChannel.config.status === "off"){
                    findChannel.config.status = "on";
                    findChannel.save(function (err){
                        if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                        if(!err) return message.channel.send("AutoDeleteMsg no canal agora está: **On**")
                    });
                }
            }

            const autodeletemsg = new AutoDeleteMsg({
                _id: mongoose.Types.ObjectId(),
                guildId: message.guild.id,
                channelId: formatChannelId(args[1]),
                config:{
                    status: "on",
                    creator: message.member.user.tag,
                    onlyImg: "on"
                },
                sendMsg:{
                    status: "off",
                    msg: "null",
                    dm: "off"
                }
            });
            autodeletemsg.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("AutoDeleteMsg no canal agora está: **On**")
            });
        }
        else if (cmd === "off"){

            let autodeletemsg = await AutoDeleteMsg.findOne({ 'channelId': subcmd });
            if(autodeletemsg === null) return message.reply("Não existe nada atrelado a este canal !!")

           
            autodeletemsg.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("AutoDeleteMsg no canal agora está: **Off**")
            });
        }
        else return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`")
        
    }catch(e){
        errorReturn(e, message, this.help.name)
    }

}

module.exports.help = {
    name: "autodeletemsg",
    description: "Deleta msgs para deixar apenas imagens no canal desejado",
    usability: "Pode ser ativo utilizando `"+prefix+"autodeletemsg on #chat`\n"
    +"Para desabilitar use `"+prefix+"welcome off #chat`\n",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}