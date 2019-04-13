const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {

    let args2 = args.join(" ").slice(0,2)
    let args3 = args.join(" ").slice(3,6).split(' ').join('')
    console.log(`(${args3})`)
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Need Permission");
    mongoose.connect(`mongodb+srv://${bot.mongodb}@filodatabse-cfehy.gcp.mongodb.net/Database?retryWrites=true`);

    if(args2 === "en"){    
        if (args3 === "on"){
            let channel = args.join(" ").slice(6).slice(2,20);
            let chat = message.guild.channels.find(`id`, channel)
            if (!chat) return message.reply(`Couldn't find the channel: ${channel}`)

            bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

                guild.welcome = "on";
                guild.welcomeChannel = channel
                guild.save(function (err){
                    if(err) return message.channel.send(`Error: ${err}, contact support`)
                    if(!err) return message.channel.send("Welcome message is: **On**")
                });
            });
        }
        
        if (args3 === "off"){
           
            bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

                guild.welcome = "off";
                guild.save(function (err){
                    if(err) return message.channel.send(`Error: ${err}, contact support`)
                    if(!err) return message.channel.send("Welcome message is: **Off**")
                });
            });
        }
    }
    if(args2 === "msg"){
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            
            guild.welcomeMsg = args3;
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`)
                if(!err) return message.channel.send("Welcome message changed !!")
            });
        })
    }
    if(args2 == "ch"){
        let channel = args.join(" ").slice(6).slice(2,20);
        let chat = message.guild.channels.find(`id`, channel);
        if (!chat) return message.reply(`Couldn't find the channel: ${channel}`)

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            guild.welcomeChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`)
                if(!err) return message.channel.send("Channel changed !!")
            })
        })
    }
}

module.exports.help = {
    name: "welcome"
}