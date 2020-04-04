const {MessageEmbed} = require("discord.js");
var colors = require('colors');

module.exports = {
    errorReturn: function(error, channel, name) {  
        if (channel){
            let embed = new MessageEmbed()
                .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniError404.png?raw=true")
                .setTitle("Aconteceu um erro")
                .setDescription(`${error}`)
                .addField("Name", name, true)
                .addField("Erro" ,"Parece que encontrei um erro... Entre em contato com o suporte !!", true)
                .setColor("c23a3a")
            
            return channel.send(embed);
        }else{
            console.log(`Name: ${name} // Error${error}`.red);
        } 
    },    
    errorReturn: function(error, name){
        console.log(`Name: ${name} // Error${error}`.red);
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