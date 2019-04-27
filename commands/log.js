const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);

module.exports.run = async (bot, message, args) => {
    let args2 = args.join(" ").slice(0,3).split(' ').join('');
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Need permission");
    mongoose.connect(`mongodb+srv://${bot.mongodb}@filodatabse-cfehy.gcp.mongodb.net/Database?retryWrites=true`);

    if(args2 === "on"){
        let channel = args.join(" ").slice(3).slice(2,20);
        let chat = message.guild.channels.find('id', channel);
        if(!chat) return message.reply("Couldn't find the channel ``` **Exemple**: f!log on #chat ```");

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            if(guild.log === "on") return message.channel.send("it's currently setted: **On**")

            guild.log = "on";
            guild.logChannel = channel
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`)
                if(!err) return message.channel.send("Log is: **On**")
            })
        })
    }
    else if (args2 === "off"){
        
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            if(guild.log === "off") return message.channel.send("It's currently setted: **Off**");

            guild.log = "off";
            guild.logChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`);
                if(!err) return message.channel.send("Log is **Off**");
            })
        })
    }
    else if (args2 == "ch"){
        let channel = args.join(" ").slice(3).slice(2,20);
        let chat = message.guild.channels.find('id', channel);

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) =>{

            guild.logChannel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Error: ${err}, contact support`);
                if(!err) return message.channel.send(`Channel changed !!`);
            })
        })
    }
}

module.exports.help = {
    name: "log"
}