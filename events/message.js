const { mentionById } = require("../utils/functions.js");

module.exports = class {
    constructor(client) {
        this.bot = client;
    }

    async run(message) {
        if (message.author.bot) return;
        
        let prefix = null;
        message.guild.prefix ? prefix = message.guild.prefix : prefix = this.bot.prefix;
    
        let autodeletemsg = await this.bot.database.findOne("autodeletemsg", { channelId: message.channel.id });
        if(autodeletemsg && autodeletemsg != undefined){
            if(autodeletemsg.config.status === "on"){
                let imageAtt = message.attachments.first() ? message.attachments.first().proxyURL : null
                if(!imageAtt) message.delete();
            }
        }
    
        //Cmd
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) && !message.content.toLowerCase().startsWith(mentionById(this.bot.user.id))) return;
    
        const args = message.content.split(/ +/g);
        var command = 0;
        if(args[0].length === prefix.length || args[0] === mentionById(this.bot.user.id)){
            if (args[1] != undefined) command = args[1].toLowerCase();
            args.splice(0, 2); 
        }
        else command = args.shift().slice(prefix.length).toLowerCase();
        const cmd = this.bot.commands.get(command) || this.bot.aliases.get(command);
    
        //Base validations
        const langEvent = await this.bot.langs.langReturn(message.guild.language, "message", "event");
        this.bot.langs.langParams(langEvent, prefix, "message")
        if (!cmd) return message.reply(langEvent.nullCommand);
        if (message.guild.me === null || message.guild.me === undefined) return;
        
        //Lang Cmd
        const lang = await this.bot.langs.langReturn(message.guild.language, cmd.help.name, "cmd");
        if(!lang) return message.reply("`Language Null !!`")
        this.bot.langs.langParams(lang, prefix, cmd.help.name)
    
        //Perms validations
        if ((!message.guild.me.permissions.has(["SEND_MESSAGES"], true)) || !message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"], true))
            return message.member.send(langEvent.reqPerm)
    
        if (cmd.requirements.ownerOnly && !owners.includes(message.author.id))
            return message.reply(langEvent.reqOwnerPerm);
    
        if (cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
            return message.reply(`${langEvent.reqUserPerm} ${missingPerms(message.member, cmd.requirements.userPerms)}`);
    
        if (cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
            return message.reply(`${langEvent.reqBotPerm} ${missingPerms(message.guild.me, cmd.requirements.clientPerms)}`);
    
        cmd.run(this.bot, message, args, lang);
    }
};

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str =>`\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ?
        `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
        missingPerms[0];
}