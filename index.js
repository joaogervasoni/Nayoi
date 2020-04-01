const { token, prefix, mongodb, weather } = require("./botconfig.json");
const { Client, Collection } = require("discord.js");
const Guild = require("./models/guild");
const fs = require("fs");
const mongoose = require("mongoose");
var colors = require('colors');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const bot = new Client({disabledEveryone: true})

bot.Guild = Guild;
bot.baseColor = "#ff8ff2";
bot.prefix = prefix;
bot.mongodb = mongodb;
bot.weather = weather;
bot.commands = new Collection();
bot.snipes = new Map();

const commands = require("./structures/command");
commands.run(bot);

const events = require("./structures/event");
events.run(bot);

bot.on("ready", async () =>{
    console.log(`${bot.user.username} esta Online em ${bot.guilds.size} servidores`.green);
    bot.user.setActivity("y!info bot", {type: "PLAYING"});
})

bot.login(token);