const { MessageEmbed } = require("discord.js");
const { errorReturn } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let diceNum1 = args[0];
        let diceNum2 = args[1];
        
        if(diceNum1 <= 1 || isNaN(diceNum1)) return message.reply(lang.returnNull);
        
        let description = null;
        diceNum1 = Math.floor(Math.random() * diceNum1 +1);

        if(diceNum2){
            if(diceNum2 <= 1 || isNaN(diceNum2)) return message.reply(lang.returnNull);
            diceNum2 = Math.floor(Math.random() * diceNum2 +1);
            
            description = `${lang.dice1} \`${diceNum1}\`\n`+
            `${lang.dice2} \`${diceNum2}\``
        }else{
            description = `${lang.diceSolo} \`${diceNum1}\`\n`
        } 

        const embed = new MessageEmbed()
        .setTitle(lang.embedTitle)
        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/others/dice.png?raw=true")
        .setDescription(description)
        .setColor(bot.baseColor)
        .setTimestamp()

        message.channel.send(embed);
    }
    catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "dice",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}