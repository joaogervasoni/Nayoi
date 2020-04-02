const mongoose = require("mongoose");
const {MessageEmbed} = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");
const { createCanvas, loadImage, registerFont } = require("canvas");
const { join } = require("path");
const { Attachment } = require("discord.js");

module.exports = async (bot, member) => {  
    try {
        mongoose.connect(`${bot.mongodb}`);
        const guild = await bot.Guild.findOne({ 'guildId': member.guild.id });

        //autorole
         if (guild.autorole === "on") {
             let rol = guild.autoroleRole;
             if(rol) member.roles.add(rol);
         }
        //welcome
         if (guild.welcome === "on") {
            let wlchat = member.guild.channels.cache.find(channel => channel.id === guild.welcomeChannel)
             let msg = guild.welcomeMsg;
             
             function parse(str) {
                 var args = [].slice.call(arguments, 1),
                     i = 0;
                 return str.replace(/{member}/g, () => args[i++]);
             }
             function parseCount(str) {
                 var args = [].slice.call(arguments, 1),
                     i = 0;
                 return str.replace(/{membercount}/g, () => args[i++]);
             }
             msg = parse(msg, member);
             msg = parseCount(msg, member.guild.memberCount);
             
             if (guild.welcomeCanvas === "on"){
                 registerFont('arial.ttf', {family: 'Arial'});
                 const canvas = createCanvas(1000, 360);
                 const ctx = canvas.getContext("2d");
                 const background = await loadImage("https://github.com/Zaetic/Yani/blob/master/images/YaniBackground.png?raw=true");
                 ctx.drawImage(background, 0,0, canvas.width, canvas.height);
                 ctx.beginPath();
                 ctx.lineWidth = 4;
                 ctx.strokeStyle = "#ffffff";
                 ctx.globalAlpha = 0.2;
                 ctx.fillStyle = "#000000";
                 ctx.fillRect(65,280,870,65);
                 ctx.fill();
                 ctx.globalAlpha = 1;
                 ctx.strokeRect(65,280,870,65);
                 ctx.stroke();
                 ctx.fillStyle = "#e67e22";
                 ctx.globalAlpha = 0.6;
                 ctx.fillRect(180,216,100);
                 ctx.fill();
                 ctx.globalAlpha = 1;
                 ctx.font = "30px Arial";
                 ctx.textAlign = "center";
                 ctx.fillStyle = "#ffffff";
                 ctx.fillText(`Usuário: ${member.user.tag}`, 500, 325);
                 ctx.arc(500,140,120,0,Math.PI * 2, true);
                 ctx.lineWidth = 7;
                 ctx.strokeStyle = "#ffffff";
                 ctx.stroke();
                 ctx.closePath();
                 ctx.clip();
                 const avatar = await loadImage(member.user.avatarURL());
                 ctx.drawImage(avatar, 370,20,250,250);
                 const attachment = new Attachment(canvas.toBuffer(),"welcome.png");
                 return wlchat.send(msg, attachment)
             }else{
                 let welcomeEmbed = new MessageEmbed()
                 .setThumbnail(member.user.avatarURL)
                 .setDescription("Bem-vindo")
                 .setColor(bot.baseColor)
                 .addField("User", `<@!${member.id}>`)
                 .addField("Mensagem", msg)
                 return wlchat.send(welcomeEmbed)
             }
        }
     } catch (e) {
         errorReturn(e)
    }  
}

