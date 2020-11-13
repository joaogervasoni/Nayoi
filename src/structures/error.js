const {MessageEmbed} = require("discord.js");
const chalk = require("chalk");

class Error { 
    constructor(logConsole = true) {
        this.log = logConsole;
    }

    discordAPIError (error, obj, lang) {
        if(error.code === 50034){
            console.log(chalk.red(chalk.redBright('[Error-Check]'), 'Erro 50034 tratado'));
            return obj.reply(lang.error50034);
        }
        if(error.code === 50013){
            console.log(chalk.red(chalk.redBright('[Error-Check]'), 'Erro 50013 tratado'));
            return obj.reply(lang.error50013);
        }
        return
    }

    consoleLog(error, obj, name) {
        var today = new Date();
        today = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`

        if(obj){
            console.log(chalk.red(chalk.redBright('[Error]'), `Name: ${name} // Error: ${error} // Guild: ${obj.guild} // Data: ${today}`));
        }else{
            console.log(chalk.red(chalk.redBright('[Error]'), `Name: ${name} // Error: ${error} // Guild: objNull // Data: ${today}`));
        }
    }

    async errorReturn(error, obj, name) {  
        this.consoleLog(error, obj, name)
        let typeObj = null;
        if(obj) typeObj = obj.constructor.name.toLowerCase();

        if (obj && typeObj === "message") {
            const lang = await obj.client.langs.langReturn(obj.guild.language, "error", "event");

            if(error.name === "DiscordAPIError") return this.discordAPIError(error, obj, lang);
            
            let embed = new MessageEmbed()
                .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/nayoi/nayoiError404.png?raw=true")
                .setTitle("Error")
                .setDescription(`${error}`)
                .addField("Name", name, true)
                .addField("Error" ,lang.errorField, true)
                .setColor("c23a3a")
                .setTimestamp()
            
            return obj.channel.send(embed);
        }
        
    }
}

module.exports = Error;
