const {MessageEmbed} = require("discord.js");
var colors = require('colors');

module.exports = {
    errorReturn: function(error, message, name) {  
        if (message != null){
            let embed = new MessageEmbed()
                .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniError404.png?raw=true")
                .setTitle("Aconteceu um erro")
                .setDescription(`${error}`)
                .addField("Name", name, true)
                .addField("Erro" ,"Parece que encontrei um erro... Entre em contato com o suporte !!", true)
                .setColor("c23a3a")
            
            return message.channel.send(embed);
        }else{
            console.log(`Name: ${name} // Error${error}`.red);
        } 
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
    },

    formatText: function(text){
        text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return text;
    }
}