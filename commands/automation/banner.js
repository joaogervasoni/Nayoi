const { createCanvas, loadImage, registerFont } = require("canvas");
const { errorReturn, returnNull } = require("../../utils/functions.js");
const { prefix } = require("../../botconfig.json");
const { MessageAttachment } = require("discord.js");
const isImage = require('is-image');

module.exports.run = async (bot, message, args) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];
        
        if(returnNull(cmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        if(cmd === "on" || cmd === "true"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.welcome.canvas === "on") return message.channel.send("Banner já esta `"+guild.welcome.status+"`");
            if (guild.welcome.status === "off") return message.channel.send("O Bem-vindo esta `"+guild.welcome.status+"`"
            + "e precisa ser ativo para o banner funcionar digite`"+prefix+"welcome on`");

            guild.welcome.canvas = "on";
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Banner de bem-vindo agora esta `"+guild.welcome.canvas+"` :sunglasses:");
            });
        }
        else if(cmd === "off" || cmd === "false"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.welcome.canvas === "off") return message.channel.send("Banner já esta `"+guild.welcome.status+"`");

            guild.welcome.canvas = "off";
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Banner de bem-vindo agora esta `"+guild.welcome.canvas+"` :sunglasses:");
            });
        }
        else if(cmd === "cst" || cmd === "custom"){
            let url = subcmd;
            
            if (isImage(url)){
                const guild = await bot.Guild.findOne({'guildId': message.guild.id});
                guild.welcome.canvasUrl = url;
                guild.save(function (err){
                    if(err) return errorReturn(err, message, this.help.name);
                    if(!err) return message.channel.send("Imagem trocada `obs: As dimensões recomendadas são 1000x360!!`\n"
                    + "`Digite"+prefix+"banner sh para ver o preview do banner`")
                })
            }
            else if(!isImage(url)){
                return message.channel.send("Não foi encontrada uma imagem valida :moyai: `A imagem deve terminar com uma extensão valida de imagem (png, jpg e outras)`!!")
            }
        }
        else if(cmd === "sh" || cmd === "show"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if(guild.welcome.canvasUrl === "off" || guild.welcome.canvasUrl === "") return message.channel.send("Nenhuma img personaliza :worried:");
            
            imagem = guild.welcome.canvasUrl;
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
            ctx.fillText(`Usuário: ${message.member.user.tag}`, 500, 325);
            ctx.arc(500,140,120,0,Math.PI * 2, true);
            ctx.lineWidth = 7;
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(message.member.user.avatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 370,20,250,250);
            const attachment = new MessageAttachment(canvas.toBuffer(),"welcome.png");
            return message.channel.send("`Preview do banner:`", attachment)
        }
        else return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`")
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "banner",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}