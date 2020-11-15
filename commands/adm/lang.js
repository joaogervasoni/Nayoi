const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];

        if(!cmd) return message.reply(lang.helpReturn);

        if(cmd === "change"){
            if(!subcmd) return message.channel.send(lang.invalidLang)
            if(subcmd === "en-us") return message.channel.send("`en-us` Language in progress !!")

            newLang = bot.langs.getLang(subcmd);
            if(!newLang) return message.channel.send(lang.invalidLang)
 
            message.guild.language = newLang;
        
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            if(guild.server.lang === newLang.name) return message.channel.send(`${lang.statusOk} \`${guild.server.lang}\``);

            guild.server.lang = newLang.name;
            await bot.database.save(guild);

            return message.channel.send(`${lang.changedLang} ${newLang.name}`)
        }
        else if(cmd === "show"){
            let atualLang = message.guild.language.name;
            return message.channel.send(`${lang.atualLang} \`${atualLang}\``)
        }
        else if(cmd === "list"){
            let langs = "";
            bot.langs.getLangs().forEach(element => {
                langs = `${langs + element.name}\n`;
            });

            let embed = new MessageEmbed()
            .setTitle(lang.embedTitle)
            .setDescription(langs)
            .setColor(bot.baseColor)

            message.channel.send(embed)
        }
        else return message.reply(lang.helpReturn);

    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "lang",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: [],
    ownerOnly: false
}