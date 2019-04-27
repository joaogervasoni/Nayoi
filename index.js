const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Guild = require("./models/guild");
const fs = require("fs");
const mongoose = require("mongoose");
const bot = new Discord.Client({disabledEveryone: true})
bot.Guild = Guild;
bot.filoColor = "#ff8ff2";
bot.mongodb = botconfig.mongodb;
bot.commands = new Discord.Collection();
mongoose.set('useNewUrlParser', true);

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    
    if(jsfile.length <= 0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f,i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
})


bot.on("ready", async () =>{
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers`);
    bot.user.setActivity("Discord", {type: "PLAYING"});
})

bot.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type == "test") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile && cmd.slice(0,2) === prefix) commandfile.run(bot,message,args)
})

bot.on("guildCreate", async guild =>{

    mongoose.connect(`mongodb+srv://${botconfig.mongodb}@filodatabse-cfehy.gcp.mongodb.net/Database?retryWrites=true`);

    const guildNew = new Guild({
        _id: mongoose.Types.ObjectId(),
        name: guild.name,
        guildId: guild.id,
        memberCount: guild.memberCount,
        createdAt: guild.joinedAt,
        channel: "none",
        welcome: "off",
        welcomeMsg: "Welcome {member}!!",
        welcomeChannel: "welcome",
        log: "off",
        logChannel: ""
    });

    guildNew.save().then(result => console.log(result)).catch(err => console.log(err));
})

bot.on("guildMemberAdd", async member => {
    mongoose.connect(`mongodb+srv://${botconfig.mongodb}@filodatabse-cfehy.gcp.mongodb.net/Database?retryWrites=true`);

    Guild.findOne({ 'guildId': member.guild.id }, (err, guild) => {
        try {
            if (guild.welcome === "on") {
                let wlchat = member.guild.channels.find(`id`, guild.welcomeChannel);
                let msg = guild.welcomeMsg;

                function parse(str) {
                    var args = [].slice.call(arguments, 1),
                        i = 0;

                    return str.replace(/{member}/g, () => args[i++]);
                }

                function parseCount(str) {
                    var args = [].slice.call(arguments, 1),
                        i = 0;

                    return str.replace(/{membercount}/g, () => args[i++]);
                }

                msg = parse(msg, member);
                msg = parseCount(msg, member.guild.memberCount);

                let welcomeEmbed = new Discord.RichEmbed()
                    .setThumbnail(member.user.avatarURL)
                    .setDescription("Welcome")
                    .setColor(bot.filoColor)
                    .addField("User", `${member} with ID: ${member.id}`)
                    .addField("Menssage", msg)
                    .addField("Time", member.joinedAt);

                return wlchat.send(welcomeEmbed)
            }
        } catch (error) {
            console.error(`Welcome.js (guildMemberAdd) Error: ${error} , Date: ${date = new Date(Date.now())}`)
        }
    });
})

bot.on('messageDelete', async function (message) {

    Guild.findOne({'guildId': message.guild.id }, (err, guild) => {

        if (guild.log == "on" && message.channel.type == 'text') {

            let channel = message.guild.channels.find('id', guild.logChannel)
            console.log(guild.log, message.channel.type, channel)
            if (channel != null) {
                let embed = new Discord.RichEmbed()
                    .addField(":x: [Mensagge Delete]", `**Message:** ${message.cleanContent} **User:** ${message.member.user} **Channel:** ${message.channel}`)
                channel.send(embed)
            }
        }
    })
})

bot.on('guildMemberRemove', async function (member){
    let logs = await member.guild.fetchAuditLogs();
    let entry = logs.entries.find('target',member.user);

    Guild.findOne({ 'guildId': member.guild.id }, (err, guild) => {
        if(guild.log == "on"){

            let channel = member.guild.channels.find('id', guild.logChannel)
            if(channel != null){
                let embed = new Discord.RichEmbed()
                
                if (entry != null && entry.action == "MEMBER_KICK"){
                    embed
                    .addField(":ledger: [Kick]", `**User:** ${member.user} **Reason:** ${entry.reason} **By:** ${entry.executor} **Date:** ${entry.createdAt}`)
                }
                else{
                    embed
                    .addField(":ledger: [Leave]", `**User:** ${member.user} **Date:** ${entry.createdAt}`)
                }
                channel.send(embed)
            }
        }
    })
})

bot.on('guildBanAdd', async function(guild, user){
    let logs = await guild.fetchAuditLogs({type: 22});
    let entry = logs.entries.find('target', user);

    Guild.findOne({'guildId': member.guild.id}, (err, guild) => {
        if(guild.log == "on"){
            
            let channel = guild.channels.find('id', guild.logChannel)
            if(channel != null){
                let embed = new Discord.RichEmbed()
                .addField(":hammer: [Banned]", `**User:** ${user} **Reason:** ${entry.reason} **By:** ${entry.executor} **Date:** ${entry.createdAt}`)
            }
        }
    })
})


bot.login(botconfig.token);