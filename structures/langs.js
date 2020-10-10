const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "locales");
const { Collection } = require("discord.js");
let colors = require('colors');

class Langs {
    constructor(){
        this.locales = new Collection();
        
        for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".js"))){
            const prop = require(`${filePath}/${cmd}`);
            this.locales.set(prop.name, prop);
        }

        console.log(`[Lang]`.brightBlue + ` ${this.locales.size} langs carregadas`.blue);
    }

    async langReturn(guildLang, name, type) {
        let langs = guildLang;
        let langCommand = null;

        if(!type || !name || !langs) return langCommand;
        if(type === "cmd"){
            let lang1 = langs.commands.find(element => element.name === name).cmd;
            let lang2 = langs.commands.find(element => element.name === "geral").cmd;
            langCommand = await Object.assign({}, lang1, lang2);
        } 
        if(type === "event") langCommand = langs.events.find(element => element.name === name).cmd;

        //null return default lang ??
        return langCommand;
    }

    langParams(str, prefix, command){
        for (const key in str) {
            if (str.hasOwnProperty(key)) {
                str[key] = str[key].replace(/{prefix}/g, prefix);
                str[key] = str[key].replace(/{cmdName}/g, command);
            }
        }
    }

    getLang(locale){
        return this.locales.get(locale.toLowerCase());
    }
}

module.exports = Langs;