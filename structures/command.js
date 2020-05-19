const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "commands");
var colors = require('colors');

module.exports.run = (bot) => {
    var paths = [filePath];

    for (const cmd of readdirSync(filePath).filter(cmd => !cmd.endsWith(".js"))){
        let subfilePath = join(__dirname, "..", "commands", cmd);
        paths.push(subfilePath);
    }

    for (i = 0; i < paths.length; i++) {
        for (const cmd of readdirSync(paths[i]).filter(cmd => cmd.endsWith(".js"))){
            const prop = require(`${paths[i]}/${cmd}`);
            bot.commands.set(prop.help.name, prop);

            if (prop.help.aliases) for (const alias of prop.help.aliases){
                bot.aliases.set(alias, prop);
            }
        }
    }
    console.log(`[${bot.commands.size}]`.brightBlue + ` comandos carregados`.blue)
}