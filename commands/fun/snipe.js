const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../../functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = (bot, message, args) => {
    try{
        const msg = bot.snipes.get(message.channel.id);
        if (!msg) return message.reply("Sem mensagem :worried:");
    
        const embed = new MessageEmbed()
            .setAuthor(`Deletada por ${msg.author.tag}`, msg.author.avatarURL())
            .setDescription(msg.content)
    
        if (msg.image) embed.setImage(msg.image);
        
        message.channel.send(embed);
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "snipe",
    description: "Traz a ultima msg deletada do canal",
    usability: "Pode ser utilizado de maneira simples `"+prefix+"snipe`\n",
    others: "A msg retornada é referente ao canal onde foi utilizado o comando",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}