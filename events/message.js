const { prefix } = require("../botconfig");

module.exports = (bot, message) =>{
    if (message.author.bot) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile && cmd.slice(0,2) === prefix) commandfile.run(bot,message,args)

}