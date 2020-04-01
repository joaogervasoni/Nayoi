const {RichEmbed} = require("discord.js");
var colors = require('colors');

module.exports = {
    errorReturn: function(error, channel) {  
        if (channel){
            let embed = new RichEmbed()
                .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniError404.png?raw=true")
                .setTitle("Aconteceu um erro")
                .setDescription(`${error}`)
                .addField("Erro" ,"Parece que encontrei um erro... Entre em contato com o suporte !!")
                .setColor("c23a3a")
            
            return channel.send(embed);
        }else{
            console.log(`${error}`.red);
        } 
    },

    errorReturn: function(error){
        console.log(`${error}`.red);
    },

    formatDate: function(date) {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        return new Intl.DateTimeFormat('pt-BR', options).format(date);
    }
}