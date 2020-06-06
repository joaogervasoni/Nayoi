const {MessageEmbed} = require("discord.js");
const {errorReturn} = require("../utils/functions.js");

module.exports = async (bot, oldMember, newMember) => {
    if(oldMember.user.tag === newMember.user.tag) return

    //Log
    try{
        bot.database;
        const guild = await bot.Guild.findOne({ 'guildId': newMember.guild.id });
        
        if (guild.log.status == "on") {
            let channel = newMember.guild.channels.cache.find(channel => channel.id === guild.log.channel)
            if (channel) {
                let embed = new MessageEmbed()
                    .setTitle(":pencil2: [Nick trocado]")
                    .addField(`**Usuário:**`, newMember.user, true)
                    .addField(`**Nick Antigo:**`, oldMember.user.tag)
                    .addField(`**Nick Novo:**`, newMember.user.tag)
                    .setTimestamp()

                return channel.send(embed)
            }
        }
    }catch(e){
        errorReturn(e, null, "guildMemberUpdate")
    }
}