const { token, prefix } = require("./botconfig.json");
const { Client, Collection } = require("discord.js");
const Guild = require("./models/guild");
const fs = require("fs");
var colors = require('colors');

const bot = new Client({disabledEveryone: true, partials: ['MESSAGE', 'REACTION']})

bot.Guild = Guild;
bot.snipes = new Map();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.lists = new Collection();
bot.locales = new Collection();
bot.prefix = prefix;
bot.baseColor = "#ff8ff2";
bot.database = require('./utils/database.js');
bot.langs = require('./utils/langs');

const commands = require("./structures/command");
commands.run(bot);

const events = require("./structures/event");
events.run(bot);

const lists = require("./structures/list");
lists.run(bot);

const langs = require("./structures/lang");
langs.run(bot);

bot.on("ready", async () =>{
    bot.user.setActivity(`nayoi.com | n!help`, {type: "PLAYING"});
    for await (let guild of bot.guilds.cache.array()) {

        let lang = undefined;
        let guildDb = await bot.Guild.findOne({ 'guildId': guild.id });
        if(guildDb) lang = guildDb.server.lang;
        
        if (!lang || lang === undefined) {
            lang = "pt-br";
            guildDb.server.lang = lang;
            guildDb.save();
        }
        guild.language = bot.locales.get(lang);
    }
    console.log(`[Lang]`.brightGreen +` Carregadas em todos os servidores`.green);
    console.log(`[Online]`.brightGreen +` ${bot.user.username} esta Online em ${bot.guilds.cache.size} servidores`.green);
})

bot.login(token);