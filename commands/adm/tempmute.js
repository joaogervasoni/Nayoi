const {errorReturn} = require("../../utils/functions.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, lang) => {
    try{
        //tempmute @user 1/s/m/h/d
        let toMute = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
        if(!toMute) return message.reply(lang.returnNull);
        if((message.member.roles.highest.rawPosition < toMute.roles.highest.rawPosition) || (message.member.roles.highest.rawPosition === toMute.roles.highest.rawPosition) || (toMute.hasPermission("ADMINISTRATOR")))
            return message.reply(lang.highRole);

        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");

        if(!muterole){
            return message.reply(lang.returnDisabled);
            try{
                muterole = await message.guild.roles.create({ data: { name: 'Muted', color: "#000000", permissions: [] } });
  
                await message.guild.channels.forEach(async (channel, id) => {
 
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                })
            }catch(e){
                console.log(e.stack);
            }
        }

        let mutetime = args[1];
        if(!mutetime) return message.reply(lang.returnInvalid);

        try {
            message.reply(`<@${toMute.id}> ${returnMuted} ${ms(ms(mutetime))}`)
        } catch (e) {
            return message.reply(lang.returnInvalid);
        }

        await(toMute.roles.add(muterole.id));

        setTimeout(function(){
            toMute.roles.remove(muterole.id);
            message.channel.send(`<@${toMute.id}> ${lang.returnRemoveMute}`);
        }, ms(mutetime));
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "tempmute",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["MUTE_MEMBERS"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}