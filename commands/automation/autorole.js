const { returnNull, formatId } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];

        if(returnNull(cmd)) return message.reply(lang.helpReturn);

        if (cmd === "on" || cmd === "true"){
            let roleid = formatId(subcmd);
            role = message.guild.roles.cache.get(roleid);

            if (!role) return message.reply(lang.returnNull);
            if (role.rawPosition > message.member.roles.highest.rawPosition || !message.member.hasPermission("ADMINISTRATOR")) return message.reply(lang.roleHigh)
            
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.autorole.status === "on") return message.channel.send(`${lang.statusOk} \`${guild.autorole.status}\``);

            guild.autorole.status = "on";
            guild.autorole.role = role.id;
            guild.save(function (err){
                if(err) return bot.error.errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${guild.autorole.status}\` :sunglasses:`);
            });
        }
        else if (cmd === "off" || cmd === "false"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.autorole.status === "off") return message.channel.send(`${lang.statusOk} \`${guild.autorole.status}\``);
        
            guild.autorole.status = "off";
            guild.save(function (err){
                if(err) return bot.error.errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${guild.autorole.status}\` :cry:`);
            });
        }
        else if(cmd === "rol" || cmd === "role"){
            let role = formatId(subcmd);
            role = message.guild.roles.cache.get(role);

            if (!role) return message.reply(lang.returnNull);
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            
            guild.autorole.role = role.id;
            guild.save(function (err){
                if(err) return bot.error.errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(lang.roleChange)
            })
        }
        else if(cmd === "sh" || cmd === "show"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            
            if (guild.autorole.status === "off") return message.channel.send(`Autorole ${lang.returnNotActived}`);
            return message.channel.send(`\`${lang.roleAtual}\` <@&${guild.autorole.role}>`)
        }
        else return message.reply(lang.helpReturn);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
    
}

module.exports.help = {
    name: "autorole",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["MANAGE_ROLES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}