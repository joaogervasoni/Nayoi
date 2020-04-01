const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports.run = async (bot, message, args) => {

    let args2 = args.join(" ").slice(0,3).split(' ').join('')
    
  
    if(args2 === "on" || args2 === "off" || args2 === "msg" || args2 === "ch" || args2 === "sh" || args2 === "cv"){
        mongoose.connect(`${bot.mongodb}`);
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});

        if (args2 === "on"){
            let channel = args.join(" ").slice(3).slice(2,20);
            let chat = message.guild.channels.find(chat => channel, `id` )
            if (!chat) return message.reply(`Não encontrei o canal _(Exemplo: y!welcome on #chat)_`)
    
            if (guild.welcome === "on") return message.channel.send(`Bem-vindo esta atualmente: **On**`)
            
            guild.welcome = "on";
            guild.welcomeChannel = channel
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Bem-vindo agora está: **On**")
            });
        }
        else if (args2 === "off"){
            if (guild.welcome === "off") return message.channel.send(`Bem-vindo esta atualmente: **Off**`)
        
            guild.welcome = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Bem-vindo agora está: **Off**")
            });
        }
        else if(args2 === "msg"){           
            guild.welcomeMsg = args.join(" ").slice(3)
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Mensagem de Bem-vindo modificada !!")
            });
        }
        else if(args2 === "ch"){
            let channel = args.join(" ").slice(2).slice(3,21);
            let chat = message.guild.channels.find(`id`, channel);
            if (!chat) return message.reply(`Não encontrei este canal :C`)
    
            guild.welcomeChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Canal trocado !!")
            })
        }
        else if(args2 === "sh"){
            return message.channel.send(`**Mensagem atual:** ${guild.welcomeMsg}`)
        }else if(args2 === "cv"){
            if (guild.welcomeCanvas === "off"){
                guild.welcomeCanvas = "on";
            }else{
                guild.welcomeCanvas = "off";
            }
        
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send(`Banner agora está: **${guild.welcomeCanvas}**`)
            });
        }
    }else return message.reply(`Preciso de um prefixo (Ex: on,off,msg,ch,sh,cv)`)
}

module.exports.help = {
    name: "welcome"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}