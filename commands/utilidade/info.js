const { formatDate, upperCaseFirst } = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = (bot, message, args) => {
    try{
        const cmd = args[0];

        if(cmd === "bot"){
            let botembed = new MessageEmbed()
            .setTitle("Informação do Bot")
            .setThumbnail(bot.user.avatarURL())
            .setColor(bot.baseColor)
            .addField("Nome", bot.user.username, true)
            .addField("Criador", "Zaetic#9549", true)
            .addField("Ping:", message.client.ws.ping.toFixed(2), true)
            .addField("Criado em", formatDate(bot.user.createdAt), true)
            .addField("Entrou em", formatDate(message.member.guild.joinedAt), true)
            .addField("Link", "http://nayoi.com")
            
            return message.channel.send(botembed);
        }
        else if(cmd === "server"){
            let onlineCount = message.guild.members.cache.filter(m => m.presence.status === 'online').size;
            let offlineCount = message.guild.members.cache.filter(m => m.presence.status === 'offline').size;
            let idleCount = message.guild.members.cache.filter(m => m.presence.status === 'idle').size;
            let dndCount = message.guild.members.cache.filter(m => m.presence.status === 'dnd').size;
        
            let serverembed = new MessageEmbed()
            .setTitle("Informações do Servidor")
            .setThumbnail(message.guild.iconURL())
            .setColor(bot.baseColor)
            .addField("Nome", message.guild.name, true)
            .addField("Id", message.guild.id, true)
            .addField("Região", upperCaseFirst(message.guild.region), true)
            .addField("Criado em", formatDate(message.guild.createdAt), true)
            .addField("Você se juntou em", formatDate(message.member.joinedAt), true)
            .addField("Total de membros `"+ message.guild.memberCount +"`", 
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
            .addField("Criado em:", formatDate(User.createdAt))
            .addField("Entrou em:", formatDate(User.joinedAt), true)

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
            .addField("Criado em:", formatDate(User.user.createdAt))
            .addField("Entrou em:", formatDate(User.joinedAt), true)

            return message.channel.send(mentionembed)
        }else return message.reply("Para saber informações do comando digite `"+prefix+"help info`");
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "info",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}