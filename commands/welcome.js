const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);

module.exports.run = async (bot, message, args) => {

    let args2 = args.join(" ").slice(0,3).split(' ').join('')
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Need Permission");
    mongoose.connect(`mongodb+srv://${bot.mongodb}@filodatabse-cfehy.gcp.mongodb.net/Database?retryWrites=true`);
  
    if (args2 === "on"){
        let channel = args.join(" ").slice(3).slice(2,20);
        let chat = message.guild.channels.find(`id`, channel)
        if (!chat) return message.reply(`Couldn't find the channel _(Exemple: f!welcome on #chat)_`)

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.welcome === "on") return message.channel.send(`it's currently setted: **On**`)
            
            guild.welcome = "on";
            guild.welcomeChannel = channel
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`)
                if(!err) return message.channel.send("Welcome message is: **On**")
            });
        });
    }
    else if (args2 === "off"){
       
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.welcome === "off") return message.channel.send(`it's currently setted: **Off**`)
        
            guild.welcome = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`)
                if(!err) return message.channel.send("Welcome message is: **Off**")
            });
        });
    }
    else if(args2 === "msg"){
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            guild.welcomeMsg = args.join(" ").slice(3)
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`)
                if(!err) return message.channel.send("Welcome message changed !!")
            });
        })
    }
    else if(args2 === "ch"){
        let channel = args.join(" ").slice(2).slice(3,21);
        let chat = message.guild.channels.find(`id`, channel);
        if (!chat) return message.reply(`Couldn't find the channel`)

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            guild.welcomeChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`)
                if(!err) return message.channel.send("Channel changed !!")
            })
        })
    }
    else if(args2 === "sh"){
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            return message.channel.send(`**Actual msg:** ${guild.welcomeMsg}`)
        })
    
    }else return message.reply(`Need a welcome prefix`)
}

module.exports.help = {
    name: "welcome"
}