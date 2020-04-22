const {MessageEmbed} = require("discord.js");
var request = require('request');
const {errorReturn, formatText} = require("../../functions.js");
const { prefix } = require("../../botconfig.json");
const weather = "ed901cbf6d0ca73aa44fda5632f67241";

module.exports.run = (bot, message, args) => {
    
    let args2 = args.join(" ").slice(0)
    const parsed = formatText(args2);

    request(`https://api.openweathermap.org/data/2.5/weather?q=${parsed}&appid=${weather}`, function (err, response, body) {
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
    name: "tempo",
    description: "Traz a temperatura atual do local requisitado",
    usability: "Pode ser utilizado de maneira simples `"+prefix+"tempo local`\n",
    additional: "",
    others: "A utilização de acentos ou 'ç' na pesquisa pode não retornar dados",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}