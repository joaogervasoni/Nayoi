const { MessageAttachment, MessageEmbed } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const checkLinks = require('check-links')

module.exports = class{
    constructor(client){
        this.bot = client;
    }

    async run(oldUser, newUser){
        if(oldUser.bot === true) return
        if(!oldUser || !newUser) return
        if(oldUser.avatar === newUser.avatar && oldUser.tag === newUser.tag) return
    
        try{
            let guildDb = await this.bot.database.find("guild", { 'log.status': "on" });
            if(!guildDb) return;
    
            //Tag
            if(oldUser.tag != newUser.tag){
                for (let index = 0; index < guildDb.length; index++){
                    let guild = this.bot.guilds.cache.get(guildDb[index].guildId)
                    if(guild){
                        const lang = await this.bot.langs.langReturn(guild.language, "userUpdate", "event");
                        let userFind = guild.members.cache.get(oldUser.id)
                        if(userFind){
                            let channel = guild.channels.cache.get(guildDb[index].log.channel)
    
                            const embedAll = new MessageEmbed()
                            .setTitle(`:pencil2: [${lang.embedNcTitle}]`)
                            .addField(`**${lang.fieldUser}**`, newUser, true)
                            .addField(`**${lang.fieldOldNick}**`, oldUser.tag)
                            .addField(`**${lang.fieldNewNick}**`, newUser.tag)
                            .setColor(this.bot.baseColor)
                            .setTimestamp()
    
                            await channel.send(embedAll)
                        }
                    }
                }
            }
            //Avatar
            if(oldUser.avatar != newUser.avatar){
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
                
                for (let index = 0; index < guildDb.length; index++){
                    let guild = this.bot.guilds.cache.get(guildDb[index].guildId)
                    if(guild){
                        const lang = await this.bot.langs.langReturn(guild.language, "userUpdate", "event");
                        let userFind = guild.members.cache.get(oldUser.id)
                        if(userFind){
                            let channel = guild.channels.cache.get(guildDb[index].log.channel)
    
                            const embedAll = new MessageEmbed()
                            .setImage("attachment://newImage.png")
                            .setTitle(`:frame_photo: [${lang.embedImgTitle}]`)
                            .addField(`**${lang.fieldUser}**`, userFind.user.tag, true)
                            .addField(`**ID:**`, userFind.user.id, true)
                            .setColor(this.bot.baseColor)
                            .setTimestamp()
    
                            await channel.send({ files: [attachment], embed: embedAll})
                        }
                    }
                }
            }
            return;
        }catch(e){
            this.bot.error.errorReturn(e, null, "userUpdate")
        }
    }
}