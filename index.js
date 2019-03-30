const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disabledEveryone: true})
const filoColor = "#ff8ff2";

bot.on("ready", async () =>{
    console.log(`${bot.user.username} is online!!`);
    bot.user.setActivity("Coding", {type: "WATCHING"});
})

bot.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type == "test") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}hello`){
        return message.channel.send("Hello master !!");
    }
    
    if(cmd === `${prefix}serverinfo`){

        var onlineCount = message.guild.members.filter(m => m.presence.status === 'online').size;
        var offlineCount = message.guild.members.filter(m => m.presence.status === 'offline').size;
        
        let servericon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setTitle("Server info")
        .setThumbnail(servericon)
        .setColor(filoColor)
        .addField("Server name", message.guild.name)
        .addField("id", message.guild.id, true)
        .addField("Region", message.guild.region, true)
        .addField("Created on", message.guild.createdAt)
        .addField("You joined", message.guild.joinedAt)
        .addField("Total Members", message.guild.memberCount)
        .addField("Online", onlineCount, true)
        .addField("Offline", offlineCount, true);

        return message.channel.send(serverembed);
    }

    if(cmd === `${prefix}botinfo`){
        let boticon = bot.user.avatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setThumbnail(boticon)
        .setColor(filoColor)
        .addField("Bot Name", bot.user.username, true)
        .addField("My master", "Zaetic#9549", true)
        .addField("Created On", bot.user.createdAt);

        return message.channel.send(botembed);
    }
})

bot.login(botconfig.token);