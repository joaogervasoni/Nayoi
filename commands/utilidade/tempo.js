const { MessageEmbed } = require("discord.js");
const { errorReturn, formatText } = require("../../functions.js");
const { prefix , weatherApi } = require("../../botconfig.json");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    try{
        const local = formatText(args.join(" ").slice(0));
        if(local === "" || local === undefined) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${weatherApi}`).then(res => res.json());
        if(weather.cod != "200" || weather === null || weather === undefined) return message.reply("Não encontrei nenhuma informação de tempo :worried:")
        
        let temp = (weather.main.temp - 273.15).toFixed(2);
        let feels = (weather.main.feels_like - 273.15).toFixed(2);
        let embed = new MessageEmbed()
            .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/YaniTempo.png?raw=true")
            .setTitle(`Temperatura de ${weather.name}`)
            .addField(`Temperatura:`, `${temp} °C`, true)
            .addField(`Sensação:`, `${feels} °C`, true)
            .addField(`Local:`, weather.sys.country)
            .setColor(bot.baseColor)
        return message.channel.send(embed)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
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