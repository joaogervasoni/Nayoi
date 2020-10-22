const { MessageEmbed } = require("discord.js");
const { formatText } = require("../../utils/functions.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let { weatherApi } = bot.apis;

        let local = args.join(" ").slice(0);
        local = formatText(local);
        if(local === "" || local === undefined) return message.reply(lang.helpReturn);
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${weatherApi}`).then(res => res.json());
        if(weather.cod != "200" || weather === null || weather === undefined) return message.reply(lang.returnNull)
        
        let temp = (weather.main.temp - 273.15).toFixed(2);
        let feels = (weather.main.feels_like - 273.15).toFixed(2);
        let embed = new MessageEmbed()
            .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/others/weather.png?raw=true")
            .setTitle(lang.tempname.replace(/{weather.name}/g, weather.name))
            .addField(lang.temp, `${temp} °C`, true)
            .addField(lang.sens, `${feels} °C`, true)
            .addField(lang.local, weather.sys.country)
            .setColor(bot.baseColor)
        return message.channel.send(embed)
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "weather",
    type: "utility",
    aliases: ["temp","tempo"]
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}