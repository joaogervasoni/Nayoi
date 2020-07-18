const { MessageEmbed, MessageAttachment } = require("discord.js");
const { errorReturn } = require("../utils/functions.js");
const { createCanvas, loadImage, registerFont } = require("canvas");
const checkLinks = require('check-links');

module.exports = async (bot, member) => {  
    try {
        const lang = await bot.langs.langReturn(member.guild.language, "guildMemberAdd", "event");
        const guild = await bot.Guild.findOne({ 'guildId': member.guild.id });

        //Update memberCount
        guild.memberCount = member.guild.memberCount;
        guild.save();
        
        //autorole
        if (guild.autorole.status === "on") {
            let rol = guild.autorole.role;
            if(rol) member.roles.add(rol);
        }
        //welcome
         if (guild.welcome.status === "on") {
            let wlchat = member.guild.channels.cache.find(channel => channel.id === guild.welcome.channel)
             let msg = guild.welcome.msg;
             
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
             
             
             if (guild.welcome.canvas === "on"){
                let check = await checkLinks([guild.welcome.canvasUrl])
                 let imagem = "https://github.com/Zaetic/Nayoi/blob/master/images/YaniBackground.png?raw=true";
                 if ((guild.welcome.canvasUrl != "off" || guild.welcome.canvasUrl != "") && (check[guild.welcome.canvasUrl].status === "alive")){
                    imagem = guild.welcome.canvasUrl;
                 }
                 //- Linux
                 //registerFont('arial.ttf', {family: 'Arial'});
                 //
                 const canvas = createCanvas(1000, 360);
                 const ctx = canvas.getContext("2d");
                 const background = await loadImage(imagem);
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
                 const avatar = await loadImage(member.user.avatarURL({ format: 'jpg' }));
                 ctx.drawImage(avatar, 370,20,250,250);
                 const attachment = new MessageAttachment(canvas.toBuffer(),"welcome.png");
                 return wlchat.send(msg, attachment)
            }else{
                let welcomeEmbed = new MessageEmbed()
                .setThumbnail(member.user.avatarURL())
                .setDescription(lang.embedDescription)
                .setColor(bot.baseColor)
                .addField(lang.fieldUser, member.user)
                .addField(lang.fieldMsg, msg)
                return wlchat.send(welcomeEmbed)
            }
        }
    } catch (e) {
        errorReturn(e, null, "guildMemberAdd")
    }  
}