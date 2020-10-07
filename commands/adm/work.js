const {returnNull, formatId} = require("../../utils/functions.js");
const {MessageEmbed, BitField} = require("discord.js");

module.exports.run = async (bot, message, args, lang) => {

    let cmd = args[0];

    if(cmd === "on"){
        let channel = args[1];
        let chat = await message.guild.channels.cache.find(chat => chat.id === formatId(channel));
        if(returnNull(chat)) return message.reply(lang.helpReturn)
    
        const msg = args.join(" ").slice(cmd.length + channel.length);
        if(returnNull(msg)) return message.reply(lang.textNull)
    
        let id = message.guild.roles.everyone.id;
        await chat.updateOverwrite(id, 
            {
                SEND_MESSAGES: false
            }
        );

        const embed = new MessageEmbed()
        .setTitle(lang.embedTitle)
        .setDescription(msg)
        .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/nayoi/nayoiWork.png?raw=true")
        .setFooter(lang.embedFooter)
        .setTimestamp()
        .setColor(bot.baseColor)
    
        await message.reply(lang.workSucess);
        return chat.send(embed);
    }
    else if(cmd === "off"){
        let channel = args[1];
        let chat = await message.guild.channels.cache.find(chat => chat.id === formatId(channel));
        if(returnNull(chat)) return message.reply(lang.helpReturn)

        let id = message.guild.roles.everyone.id;
        await chat.updateOverwrite(id, 
            {
                SEND_MESSAGES: true
            }
        );

        let msg = await chat.messages.fetch();
        msg = msg.filter(msg => msg.author.id === bot.user.id).first();
        if(!msg) return message.reply(lang.workNull)
        
        if(msg.embeds != 0){
            if(msg.embeds[0].title.toLowerCase() === "closed"){
                await msg.delete(msg, "Work nayoi - Disabled");
                return message.reply(lang.workDisabled)
            }
        }
        
        return message.reply(lang.workNull)
    }
    else return message.reply(lang.helpReturn)

    
}

module.exports.help = {
    name: "work",
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}