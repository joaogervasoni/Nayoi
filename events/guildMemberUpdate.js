const { MessageEmbed } = require("discord.js");
const { errorReturn, returnNull} = require("../utils/functions.js");

module.exports = async (bot, oldMember, newMember) => {
    /*if(oldMember.user.tag === newMember.user.tag) return

    try{
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
                        .addField(`**Usuário:**`, newMember.user, true)
                        .addField(`**Nick Antigo:**`, oldMember.user.tag)
                        .addField(`**Nick Novo:**`, newMember.user.tag)
                        .setTimestamp()
    
                    return channel.send(embed)
                    }
                }
            }
        }
    }catch(e){
        errorReturn(e, null, "guildMemberUpdate")
    }*/
}