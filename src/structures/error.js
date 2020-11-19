const {MessageEmbed} = require("discord.js");

class Error { 
    constructor(client, logConsole = true) {
        this.bot = client;
        this.log = logConsole;
    }

    discordAPIError (error, obj, lang) {
        if(error.code === 50034){
            this.bot.logger.warn('Erro 50034 tratado', 'error-check');
            return obj.reply(lang.error50034);
        }
        if(error.code === 50013){
            this.bot.logger.warn('Erro 50013 tratado', 'error-check');
            return obj.reply(lang.error50013);
        }
        return
    }

    consoleLog(error, obj, name) {
        var today = new Date();
        today = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`

        if(obj){
            this.bot.logger.error(`Name: ${name} // Error: ${error} // Guild: ${obj.guild} // Data: ${today}`, 'error');
        }else{
            this.bot.logger.error(`Name: ${name} // Error: ${error} // Guild: objNull // Data: ${today}`, 'error');
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
