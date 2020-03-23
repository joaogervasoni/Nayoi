const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports = (bot, member) => {
    
   mongoose.connect(`${bot.mongodb}`);

   bot.Guild.findOne({ 'guildId': member.guild.id }, (err, guild) => {
       try {
           if (guild.welcome === "on") {
               let wlchat = member.guild.channels.find(`id`, guild.welcomeChannel);
               let msg = guild.welcomeMsg;

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

               let welcomeEmbed = new Discord.RichEmbed()
                   .setThumbnail(member.user.avatarURL)
                   .setDescription("Bem-vindo")
                   .setColor(bot.baseColor)
                   .addField("User", `${member} with ID: ${member.id}`)
                   .addField("Menssage", msg)

               return wlchat.send(welcomeEmbed)
           }
       } catch (error) {
           console.error(`Welcome.js (guildMemberAdd) Error: ${error} , Date: ${date = new Date(Date.now())}`)
       }
   });

}

