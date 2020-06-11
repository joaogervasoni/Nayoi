const { errorReturn, formatChannelId, returnNull } = require("../../utils/functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    
    const cmd = args[0];
    let subcmd = args[1];

    if(returnNull(cmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
        
    if(cmd === "on" || cmd === "true"){
        if(returnNull(subcmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        let channel = formatChannelId(subcmd);
        let chat = message.guild.channels.cache.find(chat => channel, `id` );
        if(returnNull(chat)) return message.reply(`Não encontrei nenhum canal :crying_cat_face:`);

        const guild = await bot.Guild.findOne({'guildId': message.guild.id});
        if(guild.log.status === "on") return message.channel.send("Log já esta `"+guild.log.status+"`");

        guild.log.status = "on";
        guild.log.channel = channel;
        guild.save(function (err){
            if(err) return errorReturn(err, message, this.help.name);
            if(!err) return message.channel.send("Log agora esta `"+guild.log.status+"` :sunglasses:");
        })
    }
    else if (cmd === "off" || cmd === "false"){
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});
        if(guild.log.status === "off") return message.channel.send("Log já esta `"+guild.log.status+"` :cry:");

        guild.log.status = "off";
        guild.save(function (err){
            if(err) return errorReturn(err, message, this.help.name);
            if(!err) return message.channel.send("Log agora esta `"+guild.log.status+"` :cry:");
        });
    }
    else if (cmd === "ch" || cmd === "channel"){
        if(returnNull(subcmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        let channel = formatChannelId(subcmd);
        let chat = message.guild.channels.cache.find(chat => channel, `id` )
        if(returnNull(chat)) return message.reply(`Não encontrei nenhum canal :crying_cat_face:`);
        
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});
        guild.log.channel = channel;
        guild.save(function (err){
            if(err) return message.channel.send(`Erro: ${err}, contate o suporte`);
            if(!err) return message.channel.send(`Canal trocado :face_with_monocle:!!`);
        })
    }
    else if (cmd === "sh" || cmd === "show"){
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});
        if(guild.log.status === "off") return message.channel.send("Log esta `"+guild.log.status+"` e precisa ser ativado :cry:");

        return message.channel.send("`Canal de log atual é:` <#"+guild.log.channel+">")
    }
    else return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
}

module.exports.help = {
    name: "log",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}