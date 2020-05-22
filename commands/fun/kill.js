const { errorReturn, randomCollection } = require("../../functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    try{
        let user = message.mentions.users.first()
        if (!user) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        const msg = user.username + " " + randomCollection(bot.lists, this.help.name);
    
        return message.channel.send(msg)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "kill",
    description: "Faz a pessoa morrer de alguma maneira",
    usability: "Pode ser utilizado de maneira simples `"+prefix+"kill @usuário`\n",
    additional: "",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}