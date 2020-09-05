const {errorReturn} = require("../../utils/functions.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, lang) => {
    try{
        let toMute = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
        if(!toMute) return message.reply(lang.returnNull);
        
        if((message.member.roles.highest.rawPosition <= toMute.roles.highest.rawPosition) || (toMute.hasPermission("ADMINISTRATOR"))){
            return message.reply(lang.highRole);
        }
   
        let mutetime = args[1];
        mutetime = ms(mutetime);
        if(!isNaN(mutetime) && !isNaN(args[1].charAt(args[1].length-1))) return message.reply(lang.returnInvalid)

        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole) muterole = await message.guild.roles.create({ data: { name: 'Muted', color: "#000000", permissions: [] } });

        await message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.overwritePermissions([
                {
                    id: muterole,
                    deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
                }
            ]);
        })

        await(toMute.roles.add(muterole.id));
        message.reply(`<@${toMute.id}> ${lang.returnMuted} ${ms(mutetime)}`)

        setTimeout(function(){
            toMute.roles.remove(muterole.id);
            message.channel.send(`<@${toMute.id}> ${lang.returnRemoveMute}`);
        }, mutetime);
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