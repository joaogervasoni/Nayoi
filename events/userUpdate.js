const { MessageAttachment, MessageEmbed } = require("discord.js");
const { errorReturn, returnNull } = require("../utils/functions.js");
const { createCanvas, loadImage } = require("canvas");
const checkLinks = require('check-links')

module.exports = async (bot, oldUser, newUser) => {
    if(oldUser.bot === true) return
    if(returnNull(oldUser) || returnNull(newUser)) return
    if(oldUser.avatar === newUser.avatar || oldUser.tag === newUser.tag) return
    
    try{
        if(oldUser.tag != newUser.tag){
            let guildDb = await bot.Guild.find({ 'log.status': "on" });
            
            if(!returnNull(guildDb)){
                for (let index = 0; index < guildDb.length; index++){
                    let guild = bot.guilds.cache.get(guildDb[index].guildId)
                    if(!returnNull(guild)){
    
                        let userFind = guild.members.cache.get(oldUser.id)
                        if(!returnNull(userFind)){
                            let channel = guild.channels.cache.get(guildDb[index].log.channel)
    
                            let embed = new MessageEmbed()
                            .setTitle(":pencil2: [Nick trocado]")
                            .addField(`**Usuário:**`, newUser, true)
                            .addField(`**Nick Antigo:**`, oldUser.tag)
                            .addField(`**Nick Novo:**`, newUser.tag)
                            .setTimestamp()
        
                            await channel.send(embed)
                        }
                    }
                }
            }
        }
        else if(oldUser.avatar != newUser.avatar){
            let imgOld = await oldUser.displayAvatarURL({ format: 'png' })
            let imgNew = await newUser.displayAvatarURL({ format: 'png' })
    
            const results = await checkLinks([imgOld, imgNew])
            if(results[imgOld].statusCode === 404 || results[imgNew].statusCode === 404) return
    
            const canvas = createCanvas(300, 150);
            const ctx = canvas.getContext("2d");
            ctx.beginPath();
            const avatar = await loadImage(imgOld);
            ctx.drawImage(avatar, 0,0,150,150);
            const avatar2 = await loadImage(imgNew);
            ctx.drawImage(avatar2, 150,0,150,150);
            let attachment = new MessageAttachment(canvas.toBuffer(),"newImage.png");
            
            let guildDb = await bot.Guild.find({ 'log.status': "on" });
            
            if(!returnNull(guildDb)){
                for (let index = 0; index < guildDb.length; index++){
                    let guild = bot.guilds.cache.get(guildDb[index].guildId)
                    if(!returnNull(guild)){
    
                        let userFind = guild.members.cache.get(oldUser.id)
                        if(!returnNull(userFind)){
                            let channel = guild.channels.cache.get(guildDb[index].log.channel)
    
                            const embedPicture = new MessageEmbed()
                            .setImage("attachment://newImage.png")
                            .setTitle(":frame_photo: [Imagem de perfil trocada]")
                            .addField(`**Usuário:**`, userFind.user.tag, true)
                            .addField(`**ID:**`, userFind.user.id, true)
                            .setColor(bot.baseColor)
                            .setTimestamp()
    
                            await channel.send({ files: [attachment], embed: embedPicture})
                        }
                    }
                }
            }
        }

        return;
    }catch(e){
        errorReturn(e, null, "userUpdate")
    }
}