const {MessageEmbed} = require("discord.js");
const {errorReturn, upperCaseFirst} = require("../../functions.js");
const { prefix } = require("../../botconfig.json");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    try{
        if(!args[0]) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`") 

        if(args[0] === "lista"){
            let data = await fetch(`https://pomber.github.io/covid19/timeseries.json`).then(res => res.json());
            let msg = "``";
            var keys = Object.keys(data);
            
            for (let index = 0; index < keys.length; index++) {       
                msg = msg + `*${keys[index]} `
            }
            message.channel.send(msg + "``")
        }else{
            fetch("https://pomber.github.io/covid19/timeseries.json").then(response => response.json()).then(data => {
                let country = data[upperCaseFirst(args[0])]
                if(country){
                    let lastDate = country[country.length-1];
                
                    let embed = new MessageEmbed()
                        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/YaniVir.png?raw=true")
                        .setTitle(`Corona ( Covid-19 ) ${upperCaseFirst(args[0])}`)
                        .addField(`Confirmados:`, lastDate.confirmed, true)
                        .addField(`Mortes:`, lastDate.deaths, true)
                        .addField(`Curados:`, lastDate.recovered, true)
                        .addField(`Data:`, lastDate.date, true)
                        .addField("Link", "https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6")
                        .setFooter("Não saia de casa !!")
                    return message.channel.send(embed)
                }else if(!country) return message.channel.send("Não encontrado !! `Obs: O nome do País deve ser em inglês`\n"
                + "Digite `"+ prefix +"corona lista` para ver a lista de países !!")
            });
        }
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "corona",
    description: "Mostra casos de corona",
    utility: "Para trazer informações sobre algum Pais digite `"+prefix+"corona nomedopais`\n",
    additional: "`"+ prefix +"corona lista` para ver a lista de países !!",
    others: "O Nome do Pais deve ser em inglês",
    type: "utilidade",
    aliases: ["covid"]
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}