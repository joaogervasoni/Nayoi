const {MessageEmbed} = require("discord.js");
var request = require('request');
const {errorReturn} = require("../functions.js");

module.exports.run = (bot, message, args) => {
    
    let args2 = args.join(" ").slice(0)
    request(`https://api.openweathermap.org/data/2.5/weather?q=${args2}&appid=${bot.weather}`, function (err, response, body) {
        if (response.statusCode != "200") return message.reply("Não encontrei nenhuma informação de tempo :(")
        try{
            let tempo = JSON.parse(body);
            if(tempo == null) return message.reply("Parece que aconteceu um bug em meu sistema (Erro: Json sem dados)")
            let temp = tempo.main.temp - 273.15;
            let name = tempo.name;
            let country = tempo.sys.country;
            
            let embed = new MessageEmbed()
                .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniTempo.png?raw=true")
                .setTitle(`Temperatura de ${name}`)
                .addField(`Temp:`, temp.toFixed(2))
                .addField(`Local:`, country, true)
                .setColor(bot.baseColor)
            return message.channel.send(embed)
        }catch(e){
            errorReturn(e, message, "tempo");
        }
    });
}

module.exports.help = {
    name: "tempo"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}