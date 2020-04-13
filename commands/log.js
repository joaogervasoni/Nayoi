const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
const { prefix } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let args2 = args.join(" ").slice(0,3).split(' ').join('');
    
    if(args2 === "on" || args2 === "off" || args2 === "ch"){
        mongoose.connect(`${bot.mongodb}`);
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});

        if(args2 === "on"){
            let channel = args.join(" ").slice(3).slice(2,20);
            let chat = message.guild.channels.cache.find(chat => channel, `id` )
            if(!chat) return message.reply("Não encontrei o canal _(Exemplo: y!log on #chat)_");
    
            if(guild.log === "on") return message.channel.send("Log esta atualmente: **On**")

            guild.log = "on";
            guild.logChannel = channel
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Log agora está: **On**")
            })
        }
        else if (args2 === "off"){   
            if(guild.log === "off") return message.channel.send("Log esta atualmente: **Off**");

            guild.log = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`);
                if(!err) return message.channel.send("Log agora está: **Off**");
            })
        }
        else if (args2 == "ch"){
            let channel = args.join(" ").slice(3).slice(2,20);
            let chat = message.guild.channels.cache.find(chat => channel, `id` )
            if(!chat) return message.reply("Não encontrei o canal _(Exemplo: y!log ch #chat)_");
            
            guild.logChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`);
                if(!err) return message.channel.send(`Canal modificado !!`);
            })
        }
    }else return message.reply(`Preciso de um prefixo (Ex: on,off,ch)`)
}

module.exports.help = {
    name: "log",
    description: "Gerencia toda a parte de Logs do servidor mostrando pessoas que sairam, msgs deletadas/editadas e nick alterados",
    usability: "Pode ser ativo utilizando `"+prefix+"log on #chat`\n"
    +"O canal pode ser alterado utilizando `"+prefix+"log ch #chat`\n",
    additional: "`"+prefix+"log off` - Desabilita o sistema de log",
    others: ""
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}