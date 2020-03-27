const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports.run = (bot, message, args) => {

    let args2 = args.join(" ").slice(0,3).split(' ').join('')
    mongoose.connect(`${bot.mongodb}`);

    if (args2 === "on"){

        let role = args.join(" ").slice(3).slice(3,21);
        if (!role) return message.reply(`Não encontrei esta Role _(Exemplo: y!autorole on @role)_`)

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.autorole === "on") return message.channel.send(`Autorole esta atualmente: **On**`)
            
            guild.autorole = "on";
            guild.autoroleRole = role
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Autorole agora está: **On**")
            });
        });
      
    }

    else if (args2 === "off"){
       
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.autorole === "off") return message.channel.send(`Autorole esta atualmente: **Off**`)
        
            guild.autorole = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Autorole agora está: **Off**")
            });
        });
    }

    else if(args2 === "rol"){
        let role = args.join(" ").slice(2).slice(3,21);

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            guild.autoroleRole = role
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Role trocada !!")
            })
        })
    }

    else return message.reply(`Preciso de um prefixo (Ex: on,off,rol)`)
}


module.exports.help = {
    name: "autorole"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}