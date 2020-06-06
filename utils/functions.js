const {MessageEmbed} = require("discord.js");
var colors = require('colors');

module.exports = {
    errorReturn: function(error, message, name) {  
        var today = new Date();
        today = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`

        if (message != null && message != undefined){
            console.log(`[Error]`.brightRed +` Name: ${name} // Error: ${error} // Guild: ${message.guild} // Data: ${today}`.red);
            let embed = new MessageEmbed()
                .setThumbnail("https://github.com/Zaetic/Yani/blob/master/images/YaniError404.png?raw=true")
                .setTitle("Aconteceu um erro")
                .setDescription(`${error}`)
                .addField("Name", name, true)
                .addField("Erro" ,"Parece que encontrei um erro... Entre em contato com o suporte !!", true)
                .setColor("c23a3a")
                .setTimestamp()
            
            return message.channel.send(embed);
        }else{
            console.log(`[Error]`.brightRed +` Name: ${name} // Error: ${error} // Guild: Null // Data: ${today}`.red);
        } 
    },

    returnNull: function(text){
        if(!text || text === null || text === undefined) return true;
        else return false;
    },
    
    randomCollection: function(collection, name){
        let random = collection.get(name);
        random = random[Math.floor(Math.random() * random.length)]
        return random;
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

    formatUserId: function(idText){
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
    },

    formatId: function(idText){
        if(module.exports.returnNull(idText)) return idText

        let textFirst = idText.substr(0, 2);
        if(textFirst === "<@"){
            textFirst = idText.substr(0, 3);
            if(textFirst === "<@&"){
                return module.exports.formatRoleId(idText)
            }
            else{
                return module.exports.formatUserId(idText)
            }
        }
        else if (textFirst === "<#"){
            return module.exports.formatChannelId(idText)
        }
        else if (textFirst === "<:"){
            return module.exports.formatEmojiId(idText);
        }
        else {
            return idText;
        }
    }
}