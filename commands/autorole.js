const { prefix } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let args2 = args.join(" ").slice(0,3).split(' ').join('')

    if (args2 === "on" || args2 === "off" || args2 === "rol"){
        bot.database;
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});

        if (args2 === "on"){
            let role = args.join(" ").slice(3).slice(3,21);
            if (!role) return message.reply(`Não encontrei esta Role _(Exemplo: y!autorole on @role)_`)
    
            if (guild.autorole.status === "on") return message.channel.send(`Autorole esta atualmente: **On**`)
        
            guild.autorole.status = "on";
            guild.autorole.role = role
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Autorole agora está: **On**")
            });
        }
        else if (args2 === "off"){
            if (guild.autorole.status === "off") return message.channel.send(`Autorole esta atualmente: **Off**`)
        
            guild.autorole.status = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Autorole agora está: **Off**")
            });
        }
        else if(args2 === "rol"){
            let role = args.join(" ").slice(2).slice(3,21);
    
            guild.autorole.role = role
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Role trocada !!")
            })
        }
    }
    else return message.reply(`Preciso de um prefixo (Ex: on,off,rol)`)
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