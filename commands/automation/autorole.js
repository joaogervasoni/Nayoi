const { errorReturn, formatRoleId, returnNull } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];

        if(returnNull(cmd)) return message.reply(lang.helpReturn);

        if (cmd === "on" || cmd === "true"){
            let role = formatRoleId(subcmd);
            if (!role) return message.reply(lang.returnNull);
            
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.autorole.status === "on") return message.channel.send(`${lang.statusOk} \`${guild.autorole.status}\``);
        
            guild.autorole.status = "on";
            guild.autorole.role = role;
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${guild.autorole.status}\` :sunglasses:`);
            });
        }
        else if (cmd === "off" || cmd === "false"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.autorole.status === "off") return message.channel.send(`${lang.statusOk} \`${guild.autorole.status}\``);
        
            guild.autorole.status = "off";
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${guild.autorole.status}\` :cry:`);
            });
        }
        else if(cmd === "rol" || cmd === "role"){
            let role = formatRoleId(subcmd);
            if (!role) return message.reply(lang.returnNull);
    
            guild.autorole.role = role
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
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
        errorReturn(e, message, this.help.name);
    }
    
}

module.exports.help = {
    name: "autorole",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}