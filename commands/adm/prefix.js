module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];

        if(cmd === "sh" || cmd === "show"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            return message.channel.send(`${lang.prefixAtual} \`${guild.server.prefix}\``);
        }
        else if(cmd === "ch" || cmd === "change"){
            
            if(!subcmd) return message.reply(lang.helpReturn);
            if(subcmd.length > 2 || subcmd.length < 2) return message.channel.send(lang.prefixLength);
            
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            guild.server.prefix = subcmd;
            message.guild.prefix = subcmd;
            await guild.save();

            message.channel.send(`${lang.prefixChanged} \`${subcmd}\``);
        }
        else return message.reply(lang.helpReturn)
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "prefix",
    type: "adm"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}