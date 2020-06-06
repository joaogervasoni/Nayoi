const { errorReturn, returnNull } = require("../../utils/functions.js");
const {MessageEmbed} = require('discord.js');
const { prefix } = require("../../botconfig.json");
const mongoose = require('mongoose');
const AutoDeleteMsg = require("../../models/autodeletemsg");

module.exports.run = async (bot, message, args) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];

        if(returnNull(cmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        if(cmd === "on"){
            let chat = await message.guild.channels.cache.find(chat => subcmd, `id`);
            if (!chat) return message.reply("Não encontrei nenhum canal :worried:");

            let findChannel = await AutoDeleteMsg.findOne({ 'channelId': subcmd });
            
            if(findChannel != null){
                if(findChannel.config.status === "on") return message.channel.send("Autorole já esta: `"+findChannel.config.status+"`");
            
                findChannel.config.status = "on";
                findChannel.save(function (err){
                    if(err) return errorReturn(err, message, this.help.name);
                    if(!err) return message.channel.send("AutoDeleteMsg agora esta `"+findChannel.config.status+"` :sunglasses:");
                });
            }

            const autodeletemsg = new AutoDeleteMsg({
                _id: mongoose.Types.ObjectId(),
                guildId: message.guild.id,
                channelId: subcmd,
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
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("AutoDeleteMsg agora esta `on` :sunglasses:");
            });
        }
        else if (cmd === "off"){
            let chat = await message.guild.channels.cache.find(chat => subcmd, `id`);
            if (!chat) return message.reply("Não encontrei nenhum canal :worried:");

            let autodeletemsg = await AutoDeleteMsg.findOne({ 'channelId': subcmd });
            if(autodeletemsg === null) return message.reply("Não existe nada atrelado a este canal :worried:!!")
     
            autodeletemsg.config.status = "off";
            autodeletemsg.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("AutoDeleteMsg agora esta `"+autodeletemsg.config.status+"` :cry:");
            });
        }
        else if (cmd === "show"){
            let autodeletemsgs = await AutoDeleteMsg.find({ 'guildId': message.guild.id})
            let description = "";

            autodeletemsgs.forEach(element => {
                description = description + "Canal: `"+element.channelId+"` - Status: `"+element.config.status+"`\n"
            });

            const embed = new MessageEmbed()
                .setTitle("Canais com AutoDeleteMsg")
                .setDescription(description)
                .setTimestamp()
                .setColor(bot.baseColor)

            return message.channel.send(embed)
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
    additional: "`"+prefix+"autodeletemsg show` - Para mostrar todos os canais com autodeletemsg\n",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}