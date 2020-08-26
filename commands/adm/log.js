const { errorReturn, formatChannelId, returnNull } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    
    const cmd = args[0];
    let subcmd = args[1];

    if(returnNull(cmd)) return message.reply(lang.helpReturn);
        
    if(cmd === "on" || cmd === "true"){
        if(returnNull(subcmd)) return message.reply(lang.helpReturn);

        let channel = formatChannelId(subcmd);
        let chat = message.guild.channels.cache.find(chat => chat.id === channel);
        if(returnNull(chat)) return message.reply(lang.returnNull);

        const guild = await bot.Guild.findOne({'guildId': message.guild.id});
        if(guild.log.status === "on") return message.channel.send(`${lang.statusOk} \`${guild.log.status}\``);

        guild.log.status = "on";
        guild.log.channel = channel;
        guild.save(function (err){
            if(err) return errorReturn(err, message, this.help.name);
            if(!err) return message.channel.send(`${lang.statusNew} \`${guild.log.status}\` :sunglasses:`);
        })
    }
    else if (cmd === "off" || cmd === "false"){
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});
        if(guild.log.status === "off") return message.channel.send(`${lang.statusOk} \`${guild.log.status}\` :cry:`);

        guild.log.status = "off";
        guild.save(function (err){
            if(err) return errorReturn(err, message, this.help.name);
            if(!err) return message.channel.send(`${lang.statusNew} \`${guild.log.status}\` :cry:`);
        });
    }
    else if (cmd === "ch" || cmd === "channel"){
        if(returnNull(subcmd)) return message.reply(lang.helpReturn);

        let channel = formatChannelId(subcmd);
        let chat = message.guild.channels.cache.find(chat => chat.id === channel);
        if(returnNull(chat)) return message.reply(lang.returnNull);
        
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});
        guild.log.channel = channel;
        guild.save(function (err){
            if(err) return errorReturn(err, message, this.help.name);
            if(!err) return message.channel.send(lang.channelChange);
        })
    }
    else if (cmd === "sh" || cmd === "show"){
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});
        if(guild.log.status === "off") return message.channel.send(lang.logOff.replace(/{guild.log.status}/g, guild.log.status));

        return message.channel.send(`\`${lang.channelAtual}\` <#${guild.log.channel}>`)
    }
    else return message.reply(lang.helpReturn);
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