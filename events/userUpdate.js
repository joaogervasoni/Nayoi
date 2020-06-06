const { MessageAttachment } = require("discord.js");
const { errorReturn, returnNull } = require("../utils/functions.js");
const { createCanvas, loadImage } = require("canvas");
const checkLinks = require('check-links')

module.exports = async (bot, oldUser, newUser) => {
    if(returnNull(oldUser) || returnNull(newUser)) return
    if(oldUser.avatar === newUser.avatar) return
    
    try{
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
                let guild = bot.guilds.cache.find(guild => guild.id === guildDb[index].guildId)
                if(!returnNull(guild)){

                    let user = guild.members.cache.find(user => user.id === oldUser.id)
                    if(!returnNull(user)){
                        let channel = guild.channels.cache.find(channel => channel.id === guildDb[index].log.channel)
                        let embed = ":frame_photo: **[Imagem de perfil trocada]**\n Usuário: `"+ user.tag +"` ID: `"+ user.id+"`";
                        await channel.send(embed, attachment)
                    }
                }
            }
        }
        return;
    }catch(e){
        errorReturn(e, null, "userUpdate")
    }
}