const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "locales");
var colors = require('colors');

module.exports.run = (bot) => {
    
    for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".js"))){
        const prop = require(`${filePath}/${cmd}`);
        bot.locales.set(prop.name, prop);
    }

    for (let guild of bot.guilds.cache.array()) {
        let lang; // receive default lang
        if (!lang) {
            lang = "pt-br";
            // save default lang
        }
        guild.language = require(`./locales/${lang}.js`);
    }

    console.log(`[Lang]`.brightBlue + ` ${bot.locales.size} langs carregadas`.blue);
}