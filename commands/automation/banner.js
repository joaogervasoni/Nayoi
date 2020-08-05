const { createCanvas, loadImage, registerFont } = require("canvas");
const { errorReturn, returnNull } = require("../../utils/functions.js");
const { MessageAttachment } = require("discord.js");
const isImage = require('is-image');
const checkLinks = require('check-links');

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];
        
        if(returnNull(cmd)) return message.reply(lang.helpReturn);

        if(cmd === "on" || cmd === "true"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.welcome.canvas === "on") return message.channel.send(`${lang.statusOk} \`${guild.welcome.canvas}\``);
            if (guild.welcome.status === "off") return message.channel.send(lang.welcomeOff.replace(/{guild.welcome.status}/g, guild.welcome.status));

            guild.welcome.canvas = "on";
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${guild.welcome.canvas}\` :sunglasses:`);
            });
        }
        else if(cmd === "off" || cmd === "false"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.welcome.canvas === "off") return message.channel.send(`${lang.statusOk} \`${guild.welcome.status}\``);

            guild.welcome.canvas = "off";
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${guild.welcome.canvas}\` :cry:`);
            });
        }
        else if(cmd === "cst" || cmd === "custom"){
            let url = subcmd;
            let check = await checkLinks([url])

            if (isImage(url) && (check[url].status === "alive")){
                const guild = await bot.Guild.findOne({'guildId': message.guild.id});
                guild.welcome.canvasUrl = url;
                guild.save(function (err){
                    if(err) return errorReturn(err, message, this.help.name);
                    if(!err) return message.channel.send(lang.bannerChange)
                })
            }
            else{
                return message.channel.send(lang.invalidImg)
            }
        }
        else if(cmd === "sh" || cmd === "show"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            let imagem = "https://github.com/Zaetic/Nayoi/blob/master/images/YaniBackground.png?raw=true";

            if(guild.welcome.canvasUrl === "off" || guild.welcome.canvasUrl === "") message.channel.send("Banner custom `offline`");
            let check = await checkLinks([guild.welcome.canvasUrl])
            if(check[guild.welcome.canvasUrl].status === "alive"){
                imagem = guild.welcome.canvasUrl;
                message.channel.send("Banner custom `online`");
            } 

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
            ctx.fillText(`${lang.canvasFillText} ${message.member.user.tag}`, 500, 325);
            //
            ctx.arc(500,140,120,0,Math.PI * 2, true);
            ctx.lineWidth = 7;
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
            //
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(message.member.user.avatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 370,20,250,250);
            
            const attachment = new MessageAttachment(canvas.toBuffer(),"welcome.png");
            return message.channel.send(`\`${lang.returnPreview}\``, attachment)
        }
        else return message.reply(lang.helpReturn)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "banner",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}