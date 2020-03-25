const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    //tempmute @user 1/s/m/h/d
    if(!(message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MUTE_MEMBERS"))) return message.channel.send("Precisa de permissão");
    let toMute = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
    if(!toMute) return message.reply("Não encontrei este Usuário");
    if((message.member.highestRole < toMute.highestRole.position) || (message.member.highestRole.position === toMute.highestRole.position) || (toMute.hasPermission("ADMINISTRATOR")))
        return message.reply("Cargo maior ou igual");

    let muterole = message.guild.roles.find(role => role.name === "Muted");
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
  
    let mutetime = args[1];
    if(!mutetime) return message.reply("Você não escreveu um tempo valido!!");

    try {
        message.reply(`<@${toMute.id}> foi mutado por ${ms(ms(mutetime))}`)
    } catch (e) {
        return message.reply("A escrita do comando esta errada !!");
    }

    await(toMute.addRole(muterole.id));

    setTimeout(function(){
        toMute.removeRole(muterole.id);
        message.channel.send(`<@${toMute.id}> foi desmutado`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "tempmute"
}