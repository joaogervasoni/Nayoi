const { MessageAttachment } = require("discord.js");
const { errorReturn } = require("../utils/functions.js");
const { createCanvas, loadImage } = require("canvas");
const checkLinks = require('check-links');

module.exports = async (bot, member) => {  
    try {
        const lang = await bot.langs.langReturn(member.guild.language, "guildMemberAdd", "event");
        const guild = await bot.Guild.findOne({ 'guildId': member.guild.id });

        //MemberCount
        guild.memberCount = member.guild.memberCount;
        guild.save();
        
        //Autorole
        if (guild.autorole.status === "on") {
            let rol = guild.autorole.role;
            if(rol) member.roles.add(rol);
        }

        //Welcome
        if (guild.welcome.status === "on") {
            let wlchat = member.guild.channels.cache.get(guild.welcome.channel)
            let msg = guild.welcome.msg;
            
            msg = msg.replace(/{member}/g, member);
            msg = msg.replace(/{membercount}/g, member.guild.memberCount);
            
            if (guild.welcome.canvas === "on"){
                let check = await checkLinks([guild.welcome.canvasUrl])
                let imagem = "https://github.com/Zaetic/Nayoi/blob/master/images/others/background.png?raw=true";
                let profileImage = "https://github.com/Zaetic/Nayoi/blob/master/images/others/default.png?raw=true";

                if ((guild.welcome.canvasUrl != "off") && (check[guild.welcome.canvasUrl].status === "alive")){
                   imagem = guild.welcome.canvasUrl;
                }
                if(member.user.avatar != null) profileImage = member.user.avatarURL({ format: 'jpg' });

                const canvas = createCanvas(1000, 360);
                const ctx = canvas.getContext("2d");
                const background = await loadImage(imagem);
                ctx.drawImage(background, 0,0, canvas.width, canvas.height);
                //
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
                //
                ctx.fillStyle = "#e67e22";
                ctx.globalAlpha = 0.6;
                ctx.fillRect(180,216,100);
                ctx.fill();
                ctx.globalAlpha = 1;
                //
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "#ffffff";
                ctx.fillText(`${lang.fieldUser}: ${member.user.tag}`, 500, 325);
                //
                ctx.arc(500,140,120,0,Math.PI * 2, true);
                ctx.lineWidth = 7;
                ctx.strokeStyle = "#ffffff";
                ctx.stroke();
                //
                ctx.closePath();
                ctx.clip();
                const avatar = await loadImage(profileImage);
                ctx.drawImage(avatar, 370,20,250,250);
                const attachment = new MessageAttachment(canvas.toBuffer(),"welcome.png");
                return wlchat.send(msg, attachment)
           }else{
               return wlchat.send(msg);
           }
        }
    } catch (e) {
        errorReturn(e, null, "guildMemberAdd")
    }  
}