const { MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const { returnNull, errorReturn } = require("../../utils/functions");
const path = require("path")

module.exports.run = async (bot, message, args, lang) => {
    try{
        let user = message.mentions.users.first();
        if (returnNull(user)) user = message.member.user;

        userAvatar = user.avatarURL({ format: 'jpg' });
        jailImage = "https://github.com/Zaetic/Nayoi/blob/master/images/YaniJail.png?raw=true";

        const canvas = createCanvas(300, 300);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        const avatar = await loadImage(userAvatar);
        ctx.drawImage(avatar, 0,0,300,300);
        const jail = await loadImage(jailImage);
        ctx.drawImage(jail, 0,0,300,300);
        var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var y = 0; y < imgPixels.height; y++){
            for(var x = 0; x < imgPixels.width; x++){
                var i = (y * 4) * imgPixels.width + x * 4;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = avg; 
                imgPixels.data[i + 1] = avg; 
                imgPixels.data[i + 2] = avg;
            }
        }
        ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height); 
        const attachment = new MessageAttachment(canvas.toBuffer(),"busted.png");

        return message.channel.send(attachment)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "jail",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false
}