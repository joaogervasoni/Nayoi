const { MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const { returnNull, errorReturn, formatEmojiId } = require("../../utils/functions.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        const subcmd = args[1];

        if(returnNull(cmd)) return message.reply(lang.helpReturn);
        if(returnNull(subcmd)) return message.reply(lang.returnEspaceError);

        let emoji = bot.emojis.cache.get(formatEmojiId(cmd));
        let emoji2 = bot.emojis.cache.get(formatEmojiId(subcmd));

        if(returnNull(emoji) || returnNull(emoji2)) return message.reply(lang.returnInvalid);
        
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

        return message.channel.send(`${lang.returnEmoji} \`${message.member.user.tag}\``, attachment)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "emojimaker",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}