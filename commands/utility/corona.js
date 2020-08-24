const {MessageEmbed} = require("discord.js");
const {errorReturn, upperCaseFirst} = require("../../utils/functions.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args, lang) => {
    try{
        if(!args[0]) return message.reply(lang.helpReturn) 

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
                let country = args[0].toLowerCase();
                country = data[upperCaseFirst(country)]
                if(country){
                    let lastDate = country[country.length-1];
                
                    let embed = new MessageEmbed()
                        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/others/vir.png?raw=true")
                        .setTitle(`Corona ( Covid-19 ) ${upperCaseFirst(args[0])}`)
                        .addField(lang.fieldConfirmed, lastDate.confirmed, true)
                        .addField(lang.fieldDeaths, lastDate.deaths, true)
                        .addField(lang.fieldRecovered, lastDate.recovered, true)
                        .addField(lang.fieldDate, lastDate.date, true)
                        .addField("Link", "https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6")
                        .setFooter(lang.footer)
                    return message.channel.send(embed)
                }else if(!country) return message.channel.send(lang.resultNull)
            });
        }
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "corona",
    type: "utility",
    aliases: ["covid"]
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}