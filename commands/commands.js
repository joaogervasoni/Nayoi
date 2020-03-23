const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let args2 = args.join(" ").slice(0).toLowerCase();
    let embed = new Discord.RichEmbed()

    //Commands <type>
    if(args2 === "adm"){
        embed
        .setTitle("Administration commands:")
        .setDescription("**Ban:** f!ban <person> <msg> _|| Ban user_\n" 
        +"**Kick:** f!kick <person> <msg> _|| Kick user_\n"
        +"**Tempmute:** f!tempmute <person> <time> _|| Mute user for a time_\n"
        +"**Report:** f!report <person> <msg> _|| Report user_\n"
        +"**Log:** f!log <channel> on _|| Server log_")
        return message.channel.send(embed)
    }
    else if(args2 === "automation"){
        embed
        .setTitle("Automation commands:")
        .setDescription("**Welcome:** f!welcome <type> _|| Welcome message_")
        return message.channel.send(embed)
    }
    else if(args2 === "fun"){
        embed
        .setTitle("Fun commands:")
        .setDescription("**MyAnimeList:** f!mal <type> _|| Animes, mangas..._\n"
        + "**Temperatura:** f!tempo <local> _|| Ex: Curitiba, Estados unidos..._\n"
        + "**Snipe:** f!snipe\n")
        return message.channel.send(embed)
    }
    else if(args2 === "others"){ 
        embed
        .setTitle("Others commands:")
        .setDescription("**Info:** f!info <type> _|| Server, player and bot info..._")
        return message.channel.send(embed)
    }

    //Commands
    embed
    .setTitle("Filo commands:")
    .setColor(bot.filoColor)
    .setDescription("Exemple: ```f!commands <group>```", true)
    .addField(":shield: ADM", "4 commands", true)
    .addField(":gear: Automation", "1 command", true)
    .addField(":performing_arts: Fun", "3 commands", true)
    .addField(":kaaba: Others", "1 command", true)

    return message.channel.send(embed)
}

module.exports.help = {
    name: "commands"
}