const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disabledEveryone: true})
const filoColor = "#ff8ff2";

bot.on("ready", async () =>{
    console.log(`${bot.user.username} is online!!`);
    bot.user.setActivity("Coding", {type: "LISTENING"});
})

bot.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type == "test") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if(cmd === `${prefix}hello`){
        return message.channel.send("Hello master !!");
    }

    if(cmd === `${prefix}kick`){
        
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]))
        if(!kUser) return message.channel.send("Couldn't find user");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Need permission");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("-Kick-")
        .setColor(filoColor)
        .addField("Kicked User", `${kUser} with id ${kUser.id}`)
        .addField("Kicked by", `<@${message.author.id}> with id ${message.author.id}`)
        .addField("Kicked in", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);

        let incidentsChannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentsChannel) return message.channel.send("Couldn't find incidents channel");

        message.guild.member(kUser).kick(kReason);
        incidentsChannel.send(kickEmbed);

        return;
    }

    if(cmd === `${prefix}ban`){
        
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]))
        if(!bUser) return message.channel.send("Couldn't find user");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Need permission");
        if(bUser.hasPermission("MANAGE_GUILD")) return message.channel.send("That person can't be kicked");

        let banEmbed = new Discord.RichEmbed()
        .setDescription("-Ban-")
        .setColor(filoColor)
        .addField("Banned User", `${bUser} with id ${bUser.id}`)
        .addField("Banned by", `<@${message.author.id}> with id ${message.author.id}`)
        .addField("Banned in", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

        let incidentsChannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentsChannel) return message.channel.send("Couldn't find incidents channel");

        message.guild.member(bUser).ban(bReason)
        incidentsChannel.send(banEmbed);

        return;
    }

    if(cmd === `${prefix}report`){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!rUser) return message.channel.send("Couldn't find user");
        let reason = args.join(" ").slice(22)

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor(filoColor)
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with id: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Couldn't find (reports) channel");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

        return;
    }

    if(cmd === `${prefix}serverinfo`){

        var onlineCount = message.guild.members.filter(m => m.presence.status === 'online').size;
        var offlineCount = message.guild.members.filter(m => m.presence.status === 'offline').size;
        var idleCount = message.guild.members.filter(m => m.presence.status === 'idle').size;
        var dndCount = message.guild.members.filter(m => m.presence.status === 'dnd').size;

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
        .addField(`Total Members ${message.guild.memberCount}`, 
        `Online: ${onlineCount} | Offline: ${offlineCount} | Indle: ${idleCount} | DnD: ${dndCount}`);

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