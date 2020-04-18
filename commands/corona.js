const {MessageEmbed} = require("discord.js");
const {errorReturn, formatText} = require("../functions.js");
const { prefix } = require("../botconfig.json");
const fetch = require("node-fetch");

module.exports.run = (bot, message, args) => {
    
    //let args2 = args.join(" ").slice(0)

    try{
        fetch("https://pomber.github.io/covid19/timeseries.json").then(response => response.json()).then(data => {
            let country = data["Brazil"]
            let lastDate = country[country.length-1];
            
            let embed = new MessageEmbed()
                .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniVir.png?raw=true")
                .setTitle(`Corona ( Covid-19 ) Brasil`)
                .addField(`Confirmados:`, lastDate.confirmed, true)
                .addField(`Mortes:`, lastDate.deaths, true)
                .addField(`Data:`, lastDate.date)
                .setFooter("Não saia de casa !!")
            return message.channel.send(embed)
        });

    }catch(e){
        errorReturn(e, message, "corona");
    }
}

module.exports.help = {
    name: "corona"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}