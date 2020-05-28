const { MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const { formatEmojiId, returnNull, errorReturn } = require("../../functions.js")
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    try{
        const cmd = args[0];
        const subcmd = args[1];

        if(returnNull(cmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
        if(returnNull(subcmd)) return message.reply("Os dois emojis precisam estar separados por `espaço` !!");

        let emoji = bot.emojis.cache.get(formatEmojiId(cmd));
        let emoji2 = bot.emojis.cache.get(formatEmojiId(subcmd));
        
        emoji = "https://cdn.discordapp.com/emojis/"+emoji.id;
        emoji2 = "https://cdn.discordapp.com/emojis/"+emoji2.id;


        const canvas = createCanvas(150, 150);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        const avatar = await loadImage(emoji);
        ctx.drawImage(avatar, 0,0,150,150);
        const avatar2 = await loadImage(emoji2);
        ctx.drawImage(avatar2, 0,0,150,150);
        const attachment = new MessageAttachment(canvas.toBuffer(),"newEmoji.png");

        return message.channel.send("Novo emoji criado por: `"+message.member.user.tag+"`", attachment)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "emojimaker",
    description: "Pode ser utilizado de maneira simples `"+prefix+"gif emoji1 emoji2`\n",
    others: "Os emojis devem ser custom, no caso adicionados ao servidor, emojis padrões como 🚀 não funcionam",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}