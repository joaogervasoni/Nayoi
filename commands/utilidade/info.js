const {formatDate} = require("../../functions.js");
const {MessageEmbed} = require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let args2 = args.join(" ").slice(0)
    
    if(args2 === "bot"){
        let boticon = bot.user.avatarURL();
    
        let botembed = new MessageEmbed()
        .setDescription("Informação do Bot")
        .setThumbnail(boticon)
        .setColor(bot.baseColor)
        .addField("Nome", bot.user.username, true)
        .addField("My master", "Zaetic#9549", true)
        .addField("Ping:", message.client.ws.ping.toFixed(5), true)
        .addField("Criado em", formatDate(bot.user.createdAt), true)
        .addField("Entrou em", formatDate(message.member.guild.joinedAt), true)
        .addField("Link", "https://github.com/Zaetic/Yani")
        
        return message.channel.send(botembed);
    }
    else if(args2 === "server"){
        var onlineCount = message.guild.members.cache.filter(m => m.presence.status === 'online').size;
        var offlineCount = message.guild.members.cache.filter(m => m.presence.status === 'offline').size;
        var idleCount = message.guild.members.cache.filter(m => m.presence.status === 'idle').size;
        var dndCount = message.guild.members.cache.filter(m => m.presence.status === 'dnd').size;
    
        let servericon = message.guild.iconURL();
        let serverembed = new MessageEmbed()
        .setTitle("Informações do Servidor")
        .setThumbnail(servericon)
        .setColor(bot.baseColor)
        .addField("Nome", message.guild.name)
        .addField("id", message.guild.id, true)
        .addField("Região", message.guild.region, true)
        .addField("Criado em", formatDate(message.guild.createdAt))
        .addField("Você se juntou em", formatDate(message.member.joinedAt), true)
        .addField(`Total de membros ${message.guild.memberCount}`, 
        `Online: ${onlineCount} | Offline: ${offlineCount} | Indle: ${idleCount} | DnD: ${dndCount}`);
    
        return message.channel.send(serverembed);
    }
    else if(message.mentions.members.first()){
        let User = message.mentions.members.first()

        let embed = new MessageEmbed()
        .setTitle(User.user.username)
        .setThumbnail(User.user.avatarURL())
        .setColor(bot.baseColor)
        .addField("Tag", User.user.tag)
        .addField("Bot:", User.user.bot,true)
        .addField("Id:", User.user.id, true)
        .addField("Criado em:", formatDate(User.user.createdAt))
        .addField("Entrou em:", formatDate(User.joinedAt), true)

        return message.channel.send(embed)
    }else return message.reply(`Preciso de um prefixo _(Exemplo: bot,server,@usuário)_`);
}


module.exports.help = {
    name: "info",
    description: "Traz informações sobre pessoas e servidor",
    usability: "Para trazer informações sobre alguem digite `"+prefix+"info @usuário`\n",
    additional: "`"+prefix+"info bot` - Exibe informações do bot\n"
    +"`"+prefix+"info server` - Exibe informações do servidor\n",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}