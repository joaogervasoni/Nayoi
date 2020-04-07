const mongoose = require("mongoose");
const {MessageEmbed} = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, oldMember, newMember) => {
    if(oldMember.user.tag === newMember.user.tag) return

    //Log
    try{
        mongoose.connect(`${bot.mongodb}`);
        const guild = await bot.Guild.findOne({ 'guildId': newMember.guild.id });
        
        if (guild.log == "on") {
            let channel = newMember.guild.channels.cache.find(channel => channel.id === guild.logChannel)
            if (channel != null) {
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
        errorReturn(e, "guildMemberUpdate")
    }
}