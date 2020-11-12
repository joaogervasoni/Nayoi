const { returnNull, formatId, limitLength } = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const ms = require("ms");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let cmd = args[0];
        if(returnNull(cmd)) return message.reply(lang.helpReturn);
    
        if(cmd === "show"){
            let notices = await bot.database.find("notice", { 'guildId': message.guild.id});
            let description = "";
    
            if(!returnNull(notices)) {
                notices.forEach(element => {
                    description = description + `**ID:** \`${element._id}\` - **Channel:** <#${element.channelId}> - **TextType:** \`${element.textType}\` - **Date:** \`${new Date(element.date * 1)}\`\n`
                });
            }else description = lang.nullNotice;
    
            const embed = new MessageEmbed()
            .setTitle(`Notices`)
            .setDescription(description)
            .setTimestamp()
            .setColor(bot.baseColor);
    
            return message.channel.send(embed);
        }
        else if(cmd === "remove"){
            let id = args[1];
            if((returnNull(id)) || (!mongoose.Types.ObjectId.isValid(id))) return message.reply(lang.returnFalseId);

            let noticeDel = await bot.database.findOneAndRemove("notice", { '_id': id, 'guildId': message.guild.id })
            if(returnNull(noticeDel)) return message.reply(lang.returnFalseId);
            
            return message.channel.send(lang.delNotice);
        }
        else if(cmd === "msg" || cmd === "embed"){
    
            let time = args[1];
            let channel = message.guild.channels.cache.get(formatId(args[2]))
           
            if(returnNull(time)) return message.reply(lang.invalidTime)
            if(isNaN(args[1].substring(0, args[1].length-1)) && isNaN(args[1].charAt(args[1].length-1))) return message.reply(lang.invalidTime)
            time = ms(time);
            
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
    
            noticeDB(bot, time, channel, textDB, cmd, message.guild.id);
    
            setTimeout(async function(){
                let channelExist = message.guild.channels.cache.get(channel.id)
                if(returnNull(channelExist)) return
                let noticeCheck = await bot.database.findOne("notice", { 'channelId': channel.id, 'guildId': message.guild.id, 'text': textDB });
                if(returnNull(noticeCheck)) return

                channel.send(text)
                await bot.database.findOneAndRemove("notice", { 'channelId': channel.id, 'guildId': message.guild.id, 'text': textDB});
            }, time);
    
            let thisDate = new Date();
            thisDate = Math.abs((thisDate / 1000) + (time / 1000))
            thisDate = new Date(thisDate * 1000);
    
            return message.reply(`${lang.returnTime} \`${thisDate}\``)
        }
        else return message.reply(lang.helpReturn);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
}

async function noticeDB(bot, time, channel, textDB, cmd, idGuild){
    let newTime = new Date().getTime();
    time = newTime + time;

    const notice = await bot.database.create("notice", {
        guildId: idGuild,
        channelId: channel.id,
        date: time,
        text: textDB,
        textType: cmd
    });

    await bot.database.save(notice);
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