const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args) => {

    let args2 = args.join(" ").slice(0).toLowerCase();
    let embed = new MessageEmbed()

    //Commands <type>
    if(args2 === "adm"){
        embed
        .setTitle("Comandos administrativos:")
        .setDescription("**Ban:** y!ban <usuário> <msg> _// Ban usuário_\n" 
        +"**Kick:** y!kick <usuário> <msg> _// Kick usuário_\n"
        +"**Tempmute:** y!tempmute <usuário> <time> _// Muta por um tempo_\n"
        +"**Report:** y!report <usuário> <msg> _// Reportar usuário_\n"
        +"**Log:** y!log on #channel _// Server log_")
        return message.channel.send(embed)
    }
    else if(args2 === "automation"){
        embed
        .setTitle("Automation commands:")
        .setDescription("**Welcome:** y!welcome <type> _// Mensagem de bem-vindo_\n"
        + "**Addreactions:** y!addreactions <id message> #channel _// RoleReaction_")
        return message.channel.send(embed)
    }
    else if(args2 === "fun"){
        embed
        .setTitle("Fun commands:")
        .setDescription("**Snipe:** y!snipe\n" 
        + "**HowGay:** y!howgay _//Quão gay vc é?_\n"
        + "**HowBoomer:** y!howboomer _//Quão boomer vc é?_\n"
        + "**Say:** y!say <frase> _//Fala o que vc escrever_")
        return message.channel.send(embed)
    }
    else if(args2 === "outros"){ 
        embed
        .setTitle("Others commands:")
        .setDescription("**Info:** y!info <type> _// Server, player and bot info..._")
        return message.channel.send(embed)
    }
    else if(args2 === "uteis"){ 
        embed
        .setTitle("Others commands:")
        .setDescription("**MyAnimeList:** y!mal <type> _// Animes, mangas..._\n"
        + "**Temperatura:** y!tempo <local> _// Ex: Curitiba, Estados unidos..._")
        return message.channel.send(embed)
    }

    //Commands
    embed
    .setTitle(`${bot.user.username} comandos`)
    .setColor(bot.baseColor)
    .setDescription("Exemplo: ```y!commands <grupo>```", true)
    .addField(":shield: ADM", "4 comandos", true)
    .addField(":gear: Automation", "2 comandos", true)
    .addField(":performing_arts: Fun", "6 comandos", true)
    .addField(":gem: Úteis", "2 comandos", true)
    .addField(":kaaba: Outros", "1 comando", true)

    return message.channel.send(embed)
}

module.exports.help = {
    name: "commands"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}