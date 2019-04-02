const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    //tempmute @user 1/s/m/h/d
    let toMute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!toMute) return message.reply("Couldn't find user");
    if(toMute.hasPermission("ADMINISTRATOR")) return message.reply("Can't mute them!");

    //Create role
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            })
        }catch(e){
            console.log(e.stack);
        }
    }
    //end Create role
    
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time!!");

    await(toMute.addRole(muterole.id));
    message.reply(`<@${toMute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        toMute.removeRole(muterole.id);
        message.channel.send(`<@${toMute.id}> has been unmuted`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "tempmute"
}