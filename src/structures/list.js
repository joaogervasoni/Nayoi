const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "../../", "lists");
const chalk = require('chalk');

module.exports.run = (bot) => {
    
    for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".json"))){
        const prop = require(`${filePath}/${cmd}`);
        bot.lists.set(prop.name, prop.list);
    }

    console.log(chalk.blue(chalk.blueBright('[Lists]'), bot.lists.size, 'listas carregadas'));
}