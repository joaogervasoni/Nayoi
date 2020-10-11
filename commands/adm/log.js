const { returnNull, formatId } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => { 
    try{
        const cmd = args[0];
        let subcmd = args[1];

        if(returnNull(cmd)) return message.reply(lang.helpReturn);
            
        if(cmd === "on" || cmd === "true"){
            if(returnNull(subcmd)) return message.reply(lang.helpReturn);

            let channel = formatId(subcmd);
            let chat = message.guild.channels.cache.find(chat => chat.id === channel);
            if(returnNull(chat)) return message.reply(lang.returnNull);

            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            if(guild.log.status === "on") return message.channel.send(`${lang.statusOk} \`${guild.log.status}\``);

            guild.log.status = "on";
            guild.log.channel = channel;
            
            await bot.database.save(guild);
            return message.channel.send(`${lang.statusNew} \`${guild.log.status}\` :sunglasses:`);
        }
        else if (cmd === "off" || cmd === "false"){
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            if(guild.log.status === "off") return message.channel.send(`${lang.statusOk} \`${guild.log.status}\` :cry:`);

            guild.log.status = "off";
            
            await bot.database.save(guild);
            return message.channel.send(`${lang.statusNew} \`${guild.log.status}\` :cry:`);
        }
        else if (cmd === "ch" || cmd === "channel"){
            if(returnNull(subcmd)) return message.reply(lang.helpReturn);

            let channel = formatId(subcmd);
            let chat = message.guild.channels.cache.find(chat => chat.id === channel);
            if(returnNull(chat)) return message.reply(lang.returnNull);
            
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            guild.log.channel = channel;
            
            await bot.database.save(guild)
            return message.channel.send(lang.channelChange);
        }
        else if (cmd === "sh" || cmd === "show"){
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            if(guild.log.status === "off") return message.channel.send(lang.logOff.replace(/{guild.log.status}/g, guild.log.status));

            return message.channel.send(`\`${lang.channelAtual}\` <#${guild.log.channel}>`)
        }
        else return message.reply(lang.helpReturn);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
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