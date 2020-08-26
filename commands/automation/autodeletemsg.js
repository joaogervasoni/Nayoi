const { errorReturn, returnNull, formatId } = require("../../utils/functions.js");
const {MessageEmbed} = require('discord.js');
const mongoose = require('mongoose');
const AutoDeleteMsg = require("../../models/autodeletemsg");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];

        if(returnNull(cmd)) return message.reply(lang.helpReturn);

        if(cmd === "on"){
            subcmd = formatId(subcmd)
            let chat = await message.guild.channels.cache.find(chat => chat.id === subcmd);
            if (!chat) return message.reply(lang.returnNull);

            let findChannel = await AutoDeleteMsg.findOne({ 'channelId': subcmd });
            
            if(findChannel != null){
                if(findChannel.config.status === "on") return message.channel.send(`${lang.statusOk} \`${findChannel.config.status}\``);
            
                findChannel.config.status = "on";
                findChannel.save(function (err){
                    if(err) return errorReturn(err, message, this.help.name);
                    if(!err) return message.channel.send(`${lang.statusNew} \`${findChannel.config.status}\` :sunglasses:`);
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
                if(!err) return message.channel.send(`${lang.statusNew} \`on\` :sunglasses:`);
            });
        }
        else if (cmd === "off"){
            subcmd = formatId(subcmd)
            let chat = await message.guild.channels.cache.find(chat => chat.id === subcmd);
            if (!chat) return message.reply(lang.returnNull);

            let autodeletemsg = await AutoDeleteMsg.findOne({ 'channelId': subcmd });
            if(autodeletemsg === null) return message.reply(lang.returnNull)
     
            autodeletemsg.config.status = "off";
            autodeletemsg.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${autodeletemsg.config.status}\` :cry:`);
            });
        }
        else if (cmd === "show"){
            let autodeletemsgs = await AutoDeleteMsg.find({ 'guildId': message.guild.id})
            let description = "";

            autodeletemsgs.forEach(element => {
                description = description + "**Channel:** <#"+element.channelId+"> - Status: `"+element.config.status+"`\n"
            });

            const embed = new MessageEmbed()
                .setTitle(`${lang.embedTitle} AutoDeleteMsg`)
                .setDescription(description)
                .setTimestamp()
                .setColor(bot.baseColor)

            return message.channel.send(embed)
        }
        else return message.reply(lang.helpReturn)
        
    }catch(e){
        errorReturn(e, message, this.help.name)
    }

}

module.exports.help = {
    name: "autodeletemsg",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}