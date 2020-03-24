const Discord = require("discord.js");
var request = require('request');

module.exports.run = (bot, message, args) => {
    
    let args2 = args.join(" ").slice(0)
    request(`https://api.openweathermap.org/data/2.5/weather?q=${args2}&appid=${bot.weather}`, function (err, response, body) {
        if (response.statusCode != "200") return message.reply("Não encontrei nenhuma informação de tempo :(")

            let tempo = JSON.parse(body);
            if(tempo == null) return message.reply("Não encontrei nenhuma informação de tempo :(")

            let temp = tempo.main.temp - 273.15;
            let name = tempo.name;
            let country = tempo.sys.country;
            
            let embed = new Discord.RichEmbed()
                .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniTempo.png?raw=true")
                .setTitle(`Temperatura de ${name}`)
                .addField(`Temp:`, temp.toFixed(2))
                .addField(`Local:`, country, true)
                .setColor(bot.baseColor)

            return message.channel.send(embed)
        });
}

module.exports.help = {
    name: "tempo"
}