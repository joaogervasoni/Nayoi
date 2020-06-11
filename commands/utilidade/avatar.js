const { prefix } = require("../../botconfig.json");
const {errorReturn, returnNull} = require("../../utils/functions.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    try{
        let user = message.mentions.users.first();
        if (!user) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        const embed = new MessageEmbed()
            .setThumbnail(user.avatarURL())
            .setTitle("Imagem de "+user.username)
            .setDescription(`[Clique aqui](${user.avatarURL()}) para abrir a imagem em seu browser`)
            .setColor(bot.baseColor)
        
        return message.channel.send(embed)
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "avatar",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}