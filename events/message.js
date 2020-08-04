const { prefix } = require("../botconfig");
const AutoDeleteMsg = require("../models/autodeletemsg");

module.exports = async (bot, message) => {
    if (message.author.bot) return;

    let autodeletemsg = await AutoDeleteMsg.findOne({ channelId: message.channel.id });
    if(autodeletemsg && autodeletemsg != undefined){
        if(autodeletemsg.config.status === "on"){
            let imageAtt = message.attachments.first() ? message.attachments.first().proxyURL : null
            if(!imageAtt) message.delete();
        }
    }

    //cmd
    const args = message.content.split(/ +/g);
    var command = 0;
    if(args[0].length === prefix.length){
        if (args[1] != undefined) command = args[1].toLowerCase();
        args.splice(0, 2); 
    }else command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.aliases.get(command);

    //Base validations
    const langEvent = await bot.langs.langReturn(message.guild.language, "message", "event");
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    if (message.member.permissions.missing(["SEND_MESSAGES"])) return message.member.user.send(`${langEvent.reqBotPerm} \`SEND_MESSAGES\``);
    if (!cmd) return message.reply(langEvent.nullCommand);
    if (message.guild.me === null || message.guild.me === undefined) return;
    
    //Lang Cmd
    const lang = await bot.langs.langReturn(message.guild.language, cmd.help.name, "cmd");
    if(!lang) return message.reply("`Language Null !!`")
    bot.langs.langParams(lang, prefix, cmd.help.name)

    //Perms validations
    if (cmd.requirements.ownerOnly && !owners.includes(message.author.id))
        return message.reply(langEvent.reqOwnerPerm);

    if (cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
        return message.reply(`${langEvent.reqUserPerm} ${missingPerms(message.member, cmd.requirements.userPerms)}`);

    if (cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
        return message.reply(`${langEvent.reqBotPerm} ${missingPerms(message.guild.me, cmd.requirements.clientPerms)}`);

    cmd.run(bot, message, args, lang);
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str =>`\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ?
        `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
        missingPerms[0];
}