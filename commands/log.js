const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);

module.exports.run = async (bot, message, args) => {
    let args2 = args.join(" ").slice(0,3).split(' ').join('');
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Preciso de permissão");
    mongoose.connect(`${bot.mongodb}`);

    if(args2 === "on"){
        let channel = args.join(" ").slice(3).slice(2,20);
        let chat = message.guild.channels.find('id', channel);
        if(!chat) return message.reply("Não encontrei o canal _(Exemplo: y!log on #chat)_");

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            if(guild.log === "on") return message.channel.send("Log esta atualmente: **On**")

            guild.log = "on";
            guild.logChannel = channel
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Log agora está: **On**")
            })
        })
    }
    else if (args2 === "off"){
        
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            if(guild.log === "off") return message.channel.send("Log esta atualmente: **Off**");

            guild.log = "off";
            guild.logChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`);
                if(!err) return message.channel.send("Log agora está: **Off**");
            })
        })
    }
    else if (args2 == "ch"){
        let channel = args.join(" ").slice(3).slice(2,20);
        let chat = message.guild.channels.find('id', channel);

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) =>{

            guild.logChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`);
                if(!err) return message.channel.send(`Canal modificado !!`);
            })
        })
    }
}

module.exports.help = {
    name: "log"
}