const { token, prefix } = require("./botconfig.json");
const { Client, Collection } = require("discord.js");
const Guild = require("./models/guild");
const fs = require("fs");
var colors = require('colors');

const bot = new Client({disabledEveryone: true, partials: ['MESSAGE', 'REACTION']})

bot.Guild = Guild;
bot.baseColor = "#ff8ff2";
bot.prefix = prefix;
bot.commands = new Collection();
bot.snipes = new Map();
bot.database = require('./database.js')

const commands = require("./structures/command");
commands.run(bot);

const events = require("./structures/event");
events.run(bot);

bot.on("ready", async () =>{
    console.log(`${bot.user.username} esta Online em ${bot.guilds.cache.size} servidores`.green);
    bot.user.setActivity(`${prefix}help | ${prefix}commands`, {type: "PLAYING"});
})

bot.login(token);