const {MessageEmbed} = require("discord.js");
var colors = require('colors');

module.exports = {
    errorReturn: function(error, message, name) {  
        if (message != null && message != undefined){
            console.log(`Name: ${name} // Error: ${error} // Message: ${message}`.red);
            let embed = new MessageEmbed()
                .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniError404.png?raw=true")
                .setTitle("Aconteceu um erro")
                .setDescription(`${error}`)
                .addField("Name", name, true)
                .addField("Erro" ,"Parece que encontrei um erro... Entre em contato com o suporte !!", true)
                .setColor("c23a3a")
            
            return message.channel.send(embed);
        }else{
            console.log(`Name: ${name} // Error: ${error}`.red);
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
        text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return text;
    },

    formatChannelId: function(idText){
        idText = idText.slice(2,20);
        return idText;
    },

    formatRoleId: function(idText){
        idText = idText.slice(3,21);
        return idText;
    },

    formatEmojiId: function(idText){
        idText = idText.substring(idText.indexOf(":") + 1);
        idText = idText.substring(idText.indexOf(":") + 1).slice(0,18);
        return idText;
    },

    upperCaseFirst: function(text){
        text = text.charAt(0).toUpperCase() + text.slice(1);
        return text;
    }
}