const { token, prefix } = require("./botconfig.json");
const { Client, Collection } = require("discord.js");
const Guild = require("./models/guild");

const bot = new Client({disableMentions: "everyone", partials: ['MESSAGE', 'REACTION']});

bot.Guild = Guild;
bot.snipes = new Map();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.lists = new Collection();
bot.locales = new Collection();
bot.prefix = prefix;
bot.baseColor = "#ff8ff2";
bot.database = require('./utils/database.js');
bot.langs = require('./utils/langs.js');
bot.error = require('./utils/error.js');

const commands = require("./structures/command");
commands.run(bot);

const events = require("./structures/event");
events.run(bot);

const lists = require("./structures/list");
lists.run(bot);

const langs = require("./structures/lang");
langs.run(bot);

bot.login(token);