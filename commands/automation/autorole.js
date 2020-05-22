const { errorReturn, formatRoleId, returnNull } = require("../../functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];

        if(returnNull(cmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        if (cmd === "on" || cmd === "true"){
            let role = formatRoleId(subcmd);
            if (!role) return message.reply("Não encontrei esta `Role` :cry:");
            
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.autorole.status === "on") return message.channel.send("Autorole já esta: `"+guild.autorole.status+"`");
        
            guild.autorole.status = "on";
            guild.autorole.role = role;
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Autorole agora esta `"+guild.autorole.status+"` :sunglasses:");
            });
        }
        else if (cmd === "off" || cmd === "false"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.autorole.status === "off") return message.channel.send("Autorole já esta: `"+guild.autorole.status+"`");
        
            guild.autorole.status = "off";
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Autorole agora esta `"+guild.autorole.status+"` :cry:");
            });
        }
        else if(cmd === "rol" || cmd === "role"){
            let role = formatRoleId(subcmd);
            if (!role) return message.reply("Não encontrei esta `Role` :cry:");
    
            guild.autorole.role = role
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Role trocada :sunglasses:!!")
            })
        }
        else if(cmd === "sh" || cmd === "show"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            
            if (guild.autorole.status === "off") return message.channel.send("Autorole esta `"+guild.autorole.status+"` e precisa ser ativado !!");
            return message.channel.send("`Role atual é:` <@&"+guild.autorole.role+">")
        }
        else return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
    
}

module.exports.help = {
    name: "autorole",
    description: "Gerencia autorole do servidor dando cargo automáticamente para quem entra",
    usability: "Pode ser ativo utilizando `"+prefix+"autorole on @cargo`\n"
    +"A role pode ser alterada utilizando `"+prefix+"autorole rol @cargo`\n",
    additional: "`"+prefix+"autorole off` - Desabilita o autorole\n",
    others: "",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}