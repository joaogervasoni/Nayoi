const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let args2 = args.join(" ").slice(0).toLowerCase();
    let embed = new Discord.RichEmbed()

    //Commands <type>
    if(args2 === "adm"){
        embed
        .setTitle("Comandos administrativos:")
        .setDescription("**Ban:** y!ban <usuário> <msg> _|| Ban usuário\n" 
        +"**Kick:** y!kick <usuário> <msg> _|| Kick usuário\n"
        +"**Tempmute:** y!tempmute <usuário> <time> _|| Muta por um tempo_\n"
        +"**Report:** y!report <usuário> <msg> _|| Reportar usuário\n"
        +"**Log:** y!log <canal> on _|| Server log_")
        return message.channel.send(embed)
    }
    else if(args2 === "automation"){
        embed
        .setTitle("Automation commands:")
        .setDescription("**Welcome:** y!welcome <type> _|| Mensagem de bem-vindo_")
        return message.channel.send(embed)
    }
    else if(args2 === "fun"){
        embed
        .setTitle("Fun commands:")
        .setDescription("**MyAnimeList:** y!mal <type> _|| Animes, mangas..._\n"
        + "**Temperatura:** y!tempo <local> _|| Ex: Curitiba, Estados unidos..._\n"
        + "**Snipe:** y!snipe\n")
        return message.channel.send(embed)
    }
    else if(args2 === "Outros"){ 
        embed
        .setTitle("Others commands:")
        .setDescription("**Info:** y!info <type> _|| Server, player and bot info..._")
        return message.channel.send(embed)
    }

    //Commands
    embed
    .setTitle(`${bot.user.username} comandos`)
    .setColor(bot.baseColor)
    .setDescription("Exemplo: ```y!commands <grupo>```", true)
    .addField(":shield: ADM", "4 comandos", true)
    .addField(":gear: Automation", "1 comando", true)
    .addField(":performing_arts: Fun", "3 comandos", true)
    .addField(":kaaba: Outros", "1 comando", true)

    return message.channel.send(embed)
}

module.exports.help = {
    name: "commands"
}