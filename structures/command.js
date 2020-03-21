const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "commands");

module.exports.run = (bot) => {
    for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".js"))) {
        const prop = require(`${filePath}/${cmd}`);
        bot.commands.set(prop.help.name, prop);
    }

    console.log(`${bot.commands.size} comandos carregados`)
}