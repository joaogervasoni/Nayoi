const ms = require("ms");
const {errorReturn} = require("../functions.js");

module.exports.run = async (bot, message, args) => {
    try{
        //tempmute @user 1/s/m/h/d
        let toMute = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
        if(!toMute) return message.reply("Não encontrei este Usuário");
        if((message.member.roles.highest.rawPosition < toMute.roles.highest.rawPosition) || (message.member.roles.highest.rawPosition === toMute.roles.highest.rawPosition) || (toMute.hasPermission("ADMINISTRATOR")))
            return message.reply("Cargo maior ou igual");

        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");

        if(!muterole){
            return message.reply("Comando Desabilitado");
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
        if(!mutetime) return message.reply("Você não escreveu um tempo valido!!");

        try {
            message.reply(`<@${toMute.id}> foi mutado por ${ms(ms(mutetime))}`)
        } catch (e) {
            return message.reply("A escrita do comando esta errada !!");
        }

        await(toMute.roles.add(muterole.id));

        setTimeout(function(){
            toMute.roles.remove(muterole.id);
            message.channel.send(`<@${toMute.id}> foi desmutado`);
        }, ms(mutetime));
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "tempmute"
}

module.exports.requirements = {
    userPerms: ["MUTE_MEMBERS"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}