const { formatDate, upperCaseFirst } = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        const cmd = args[0];

        if(cmd === "bot"){
            let botembed = new MessageEmbed()
            .setTitle(lang.titleBot)
            .setThumbnail(bot.user.avatarURL())
            .setColor(bot.baseColor)
            .addField(lang.fieldName, bot.user.username, true)
            .addField(lang.fieldCreator, "Zaetic#9549", true)
            .addField("Ping:", message.client.ws.ping.toFixed(2), true)
            .addField(lang.fieldCreatedAt, formatDate(bot.user.createdAt), true)
            .addField(labg.fieldEnterAt, formatDate(message.member.guild.joinedAt), true)
            .addField("Link", "http://nayoi.com")
            
            return message.channel.send(botembed);
        }
        else if(cmd === "server"){
            let onlineCount = message.guild.members.cache.filter(m => m.presence.status === 'online').size;
            let offlineCount = message.guild.members.cache.filter(m => m.presence.status === 'offline').size;
            let idleCount = message.guild.members.cache.filter(m => m.presence.status === 'idle').size;
            let dndCount = message.guild.members.cache.filter(m => m.presence.status === 'dnd').size;
        
            let serverembed = new MessageEmbed()
            .setTitle(lang.titleServer)
            .setThumbnail(message.guild.iconURL())
            .setColor(bot.baseColor)
            .addField(lang.fieldName, message.guild.name, true)
            .addField("Id", message.guild.id, true)
            .addField(lang.fieldRegion, upperCaseFirst(message.guild.region), true)
            .addField(lang.fieldCreatedAt, formatDate(message.guild.createdAt), true)
            .addField(lang.fieldEnterAt, formatDate(message.member.joinedAt), true)
            .addField(`${lang.fieldMemberTotal} \`${message.guild.memberCount}\``, 
            `Online: ${onlineCount} | Offline: ${offlineCount} | Indle: ${idleCount} | DnD: ${dndCount}`);
        
            return message.channel.send(serverembed);
        }
        else if(cmd === undefined){
            let User = message.member.user;

            let userembed = new MessageEmbed()
            .setTitle(User.username)
            .setThumbnail(User.avatarURL())
            .setColor(bot.baseColor)
            .addField("Tag", User.tag)
            .addField("Bot:", User.bot,true)
            .addField("Id:", User.id, true)
            .addField(lang.fieldCreatedAt, formatDate(User.createdAt))
            .addField(lang.fieldEnterAt, formatDate(User.joinedAt), true)

            return message.channel.send(userembed)
        }
        else if(message.mentions.members.first()){
            let User = message.mentions.members.first()

            let mentionembed = new MessageEmbed()
            .setTitle(User.user.username)
            .setThumbnail(User.user.avatarURL())
            .setColor(bot.baseColor)
            .addField("Tag", User.user.tag)
            .addField("Bot:", User.user.bot,true)
            .addField("Id:", User.user.id, true)
            .addField(lang.fieldCreatedAt, formatDate(User.user.createdAt))
            .addField(lang.fieldEnterAt, formatDate(User.joinedAt), true)

            return message.channel.send(mentionembed)
        }else return message.reply(lang.helpReturn);
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "info",
    type: "utility"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}