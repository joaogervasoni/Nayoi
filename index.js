const { token, prefix, mongodb } = require("./botconfig.json");
const { Client, Collection } = require("discord.js");
const Guild = require("./models/guild");
const fs = require("fs");
const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const bot = new Client({disabledEveryone: true})

bot.Guild = Guild;
bot.baseColor = "#ff8ff2";
bot.prefix = prefix;
bot.mongodb = mongodb;
bot.commands = new Collection();

const commands = require("./structures/command");
commands.run(bot);

const events = require("./structures/event");
events.run(bot);

bot.on("ready", async () =>{
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers`);
    bot.user.setActivity("Lavem as mãos", {type: "STREAMING"});
})

bot.on("guildCreate", async guild =>{

    mongoose.connect(`${mongodb}`);

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
        logChannel: "",
        nsfw: "off"
    });

    guildNew.save().then(result => console.log(result)).catch(err => console.log(err));
})

bot.login(token);