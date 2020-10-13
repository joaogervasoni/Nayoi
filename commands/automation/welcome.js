const { returnNull, formatId } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];
        
        if(returnNull(cmd)) return message.reply(lang.helpReturn);
        
        if (cmd === "on" || cmd === "true"){
            if(returnNull(subcmd)) return message.reply(lang.helpReturn);
            let channel = formatId(subcmd);
            let chat = await message.guild.channels.cache.find(chat => chat.id === channel );
            if (!chat || chat === undefined || chat === null) return message.reply(lang.returnNull);

            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            if (guild.welcome.status === "on") return message.channel.send(`${lang.statusOk} \`${guild.welcome.status}\``);
            
            guild.welcome.status = "on";
            guild.welcome.channel = channel;
            await bot.database.save(guild);

            return message.channel.send(`${lang.statusNew} \`${guild.welcome.status}\` :sunglasses:`);
        }
        else if (cmd === "off" || cmd === "false"){
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            if (guild.welcome.status === "off") return message.channel.send(`${lang.statusOk} \`${guild.welcome.status}\``);
        
            guild.welcome.status = "off";
            await bot.database.save(guild);
            
            return message.channel.send(`${lang.statusNew} \`${guild.welcome.status}\` :cry:`);
        }
        else if(cmd === "msg" || cmd === "message"){
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            guild.welcome.msg = args.join(" ").slice(cmd.length)
            
            await bot.database.save(guild);
            return message.channel.send(lang.msgChange);
        }
        else if(cmd === "ch" || cmd === "channel"){
            let channel = formatId(subcmd);
            let chat = await message.guild.channels.cache.find(chat => chat.id === channel);
            if (returnNull(chat)) return message.reply(lang.returnNull);

            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            guild.welcome.channel = channel;
            await bot.database.save(guild)

            return message.channel.send(lang.channelChange)
        }
        else if(cmd === "sh" || cmd === "show"){
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            return message.channel.send(`\`${lang.returnAtual}\` ${guild.welcome.msg}`)
        }
        else return message.reply(lang.helpReturn)
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "welcome",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["MANAGE_CHANNELS"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}