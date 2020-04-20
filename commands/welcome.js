const { prefix } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let args2 = args.join(" ").slice(0,3).split(' ').join('')
  
    if(args2 === "on" || args2 === "off" || args2 === "msg" || args2 === "ch" || args2 === "sh" || args2 === "cv"){
        bot.database;
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});

        if (args2 === "on"){
            let channel = args.join(" ").slice(3).slice(2,20);
            let chat = message.guild.channels.cache.find(chat => channel, `id` )
            if (!chat) return message.reply(`Não encontrei o canal _(Exemplo: y!welcome on #chat)_`)
    
            if (guild.welcome.status === "on") return message.channel.send(`Bem-vindo esta atualmente: **On**`)
            
            guild.welcome.status = "on";
            guild.welcome.channel = channel
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Bem-vindo agora está: **On**")
            });
        }
        else if (args2 === "off"){
            if (guild.welcome.status === "off") return message.channel.send(`Bem-vindo esta atualmente: **Off**`)
        
            guild.welcome.status = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Bem-vindo agora está: **Off**")
            });
        }
        else if(args2 === "msg"){           
            guild.welcome.msg = args.join(" ").slice(3)
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Mensagem de Bem-vindo modificada !!")
            });
        }
        else if(args2 === "ch"){
            let channel = args.join(" ").slice(2).slice(3,21);
            let chat = message.guild.channels.cache.find(chat => channel, `id` )
            if (!chat) return message.reply(`Não encontrei este canal :C`)
    
            guild.welcome.channel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Canal trocado !!")
            })
        }
        else if(args2 === "sh"){
            return message.channel.send(`**Mensagem atual:** ${guild.welcomeMsg}`)
        }else if(args2 === "cv"){
            if (guild.welcome.canvas === "off"){
                guild.welcome.canvas = "on";
            }else{
                guild.welcome.canvas = "off";
            }
        
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send(`Banner agora está: **${guild.welcome.canvas}**`)
            });
        }
    }else return message.reply(`Preciso de um prefixo (Ex: on,off,msg,ch,sh,cv)`)
}

module.exports.help = {
    name: "welcome",
    description: "Gerencia toda a parte de Bem-Vindo do servidor",
    usability: "Pode ser ativo utilizando `"+prefix+"welcome on #chat`\n"
    +"A mesagem pode ser alterada utilizando `"+prefix+"welcome msg mensagem-aqui`\n"
    +"**Dentro da msg podem ser utilizadas as seguintes informações:**\n"
    +"`{member}` - Para a pessoa ser marcada\n"
    +"`{membercount}` - Para monstrar o número de pessoas no servidor\n",
    additional: "`"+prefix+"welcome ch #chat` - Altera o canal do bem-vindo\n"
    +"`"+prefix+"welcome sh` - Exibe msg de bem-vindo\n"
    +"`"+prefix+"welcome cv` - Ativa o banner de bem-vindo\n",
    others: "",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}