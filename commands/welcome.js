const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports.run = async (bot, message, args) => {

    let args2 = args.join(" ").slice(0,3).split(' ').join('')
    mongoose.connect(`${bot.mongodb}`);
  
    if (args2 === "on"){
        let channel = args.join(" ").slice(3).slice(2,20);
        let chat = message.guild.channels.find(chat => channel, `id` )
        if (!chat) return message.reply(`Não encontrei o canal _(Exemplo: y!welcome on #chat)_`)

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.welcome === "on") return message.channel.send(`Bem-vindo esta atualmente: **On**`)
            
            guild.welcome = "on";
            guild.welcomeChannel = channel
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Bem-vindo agora está: **On**")
            });
        });
    }
    else if (args2 === "off"){
       
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.welcome === "off") return message.channel.send(`Bem-vindo esta atualmente: **Off**`)
        
            guild.welcome = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Bem-vindo agora está: **Off**")
            });
        });
    }
    else if(args2 === "msg"){
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            guild.welcomeMsg = args.join(" ").slice(3)
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Mensagem de Bem-vindo modificada !!")
            });
        })
    }
    else if(args2 === "ch"){
        let channel = args.join(" ").slice(2).slice(3,21);
        let chat = message.guild.channels.find(`id`, channel);
        if (!chat) return message.reply(`Não encontrei este canal :C`)

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            guild.welcomeChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Canal trocado !!")
            })
        })
    }
    else if(args2 === "sh"){
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            return message.channel.send(`**Mensagem atual:** ${guild.welcomeMsg}`)
        })
    
    }else if(args2 === "cv"){
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.welcomeCanvas === "off"){
                guild.welcomeCanvas = "on";
            }else{
                guild.welcomeCanvas = "off";
            }
        
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send(`Banner agora está: **${guild.welcomeCanvas}**`)
            });
        });
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