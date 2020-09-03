const { errorReturn, returnNull, formatId, limitLength } = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const Notice = require("../../models/notice.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let cmd = args[0];
        if(returnNull(cmd)) return message.reply(lang.helpReturn);
    
        if(cmd === "show"){
            let notices = await Notice.find({ 'guildId': message.guild.id})
            let description = "";
    
            if(!returnNull(notices)) {
                notices.forEach(element => {
                    description = description + `**Channel:** <#${element.channelId}> - **TextType:** \`${element.textType}\` - **Date:** \`${new Date(element.date * 1)}\`\n`
                });
            }else description = lang.nullNotice;
    
            const embed = new MessageEmbed()
            .setTitle(`Notices`)
            .setDescription(description)
            .setTimestamp()
            .setColor(bot.baseColor);
    
            return message.channel.send(embed);
        }
        else if(cmd === "msg" || cmd === "embed"){
    
            let time = args[1];
            let channel = message.guild.channels.cache.get(formatId(args[2]))
            time = ms(time);
    
            if(!isNaN(time) && !isNaN(args[1].charAt(args[1].length-1))) return message.reply(lang.invalidTime)
            let text = undefined;
            let textDB = undefined;
    
            if(channel){
                text = args.join(" ").slice(args[0].length + args[1].length + 2 + args[2].length)
            } 
            else{
                text = args.join(" ").slice(args[0].length + args[1].length + 1)
                channel = message.channel;
            } 
    
            if(returnNull(text)) return message.reply(lang.returnNull)
            textDB = text;
    
            if(cmd === "embed"){
                let msgSplit = text.split("||");
                
                text = new MessageEmbed()
                .setTitle(limitLength(msgSplit[0], "title"))
                .setDescription(msgSplit[1])
                .setColor(bot.baseColor)
            }
    
            noticeDB(time, channel, textDB, cmd, message.guild.id);
    
            setTimeout(async function(){
                let channelExist = message.guild.channels.cache.get(channel.id)
                if(returnNull(channelExist)) return
    
                channel.send(text)
                await Notice.findOneAndRemove({ 'channelId': channel.id, 'guildId': message.guild.id, 'text': textDB});
            }, time);
    
            let thisDate = new Date();
            thisDate = Math.abs((thisDate / 1000) + (time / 1000))
            thisDate = new Date(thisDate * 1000);
    
            return message.reply(`${lang.returnTime} \`${thisDate}\``)
        }
        else return message.reply(lang.helpReturn);
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

async function noticeDB(time, channel, textDB, cmd, idGuild){
    let newTime = new Date().getTime();
    time = newTime + time;

    const notice = new Notice({
        _id: mongoose.Types.ObjectId(),
        guildId: idGuild,
        channelId: channel.id,
        date: time,
        text: textDB,
        textType: cmd
    });

    await notice.save();
}

module.exports.help = {
    name: "notice",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}