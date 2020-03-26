const { prefix } = require("../botconfig");

module.exports = (bot, message) => {
    if (message.author.bot) return;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = bot.commands.get(command);

    // Validações padrões
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if (!cmd) return;
    if (!message.guild.me.permissions.has(["SEND_MESSAGES"])) return;

    // Validações de cargo
    if (cmd.requirements.ownerOnly && !owners.includes(message.author.id))
        return message.reply("Apenas utilizavel pelo meu mestre");

    if (cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
        return message.reply(`Você precisa das seguites permissões: ${missingPerms(message.member, cmd.requirements.userPerms)}`);

    if (cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
        return message.reply(`Eu não tenho essas permissões: ${missingPerms(message.guild.me, cmd.requirements.clientPerms)}`);

    cmd.run(bot, message, args);
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str =>`\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ?
        `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
        missingPerms[0];
}