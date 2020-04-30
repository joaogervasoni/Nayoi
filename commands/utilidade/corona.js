const {MessageEmbed} = require("discord.js");
const {errorReturn, upperCaseFirst} = require("../../functions.js");
const { prefix } = require("../../botconfig.json");
const fetch = require("node-fetch");

module.exports.run = (bot, message, args) => {
    try{
        fetch("https://pomber.github.io/covid19/timeseries.json").then(response => response.json()).then(data => {
            let country = data[upperCaseFirst(args[0])]
            if(country){
                let lastDate = country[country.length-1];
            
                let embed = new MessageEmbed()
                    .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniVir.png?raw=true")
                    .setTitle(`Corona ( Covid-19 ) ${upperCaseFirst(args[0])}`)
                    .addField(`Confirmados:`, lastDate.confirmed, true)
                    .addField(`Mortes:`, lastDate.deaths, true)
                    .addField(`Curados:`, lastDate.recovered, true)
                    .addField(`Data:`, lastDate.date, true)
                    .addField("Link", "https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6")
                    .setFooter("Não saia de casa !!")
                return message.channel.send(embed)
            }else if(!country){
                return message.channel.send("Não encontrado !! `Obs: O nome do País deve ser em inglês`")
            }else return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`") 
        });
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "corona",
    description: "Mostra casos de corona",
    utility: "Para trazer informações sobre algum Pais digite `"+prefix+"corona nomedopais`\n",
    others: "O Nome do Pais deve ser em inglês",
    type: "utilidade",
    aliases: ["covid"]
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}