const isImage = require('is-image');
const checkLinks = require('check-links');

module.exports.run = async (bot, message, args, lang) => {
    try {
        const cmd = args[0];
        let subcmd = args[1];

        if (!cmd) return message.reply(lang.helpReturn);

        if (cmd === "on" || cmd === "true") {
            const guild = await bot.database.findOne("guild", { 'guildId': message.guild.id });
            if (guild.welcome.canvas === "on") return message.channel.send(`${lang.statusOk} \`${guild.welcome.canvas}\``);
            if (guild.welcome.status === "off") return message.channel.send(lang.welcomeOff.replace(/{guild.welcome.status}/g, guild.welcome.status));

            guild.welcome.canvas = "on";
            await bot.database.save(guild);

            return message.channel.send(`${lang.statusNew} \`${guild.welcome.canvas}\` :sunglasses:`);
        }
        else if (cmd === "off" || cmd === "false") {
            const guild = await bot.database.findOne("guild", { 'guildId': message.guild.id });
            if (guild.welcome.canvas === "off") return message.channel.send(`${lang.statusOk} \`${guild.welcome.status}\``);

            guild.welcome.canvas = "off";
            await bot.database.save(guild);

            return message.channel.send(`${lang.statusNew} \`${guild.welcome.canvas}\` :cry:`);
        }
        else if (cmd === "cst" || cmd === "custom") {
            let url = subcmd;
            if (!url) return message.reply(lang.bannerNull);
            let check = await checkLinks([url]);

            if (isImage(url) && (check[url].status === "alive")) {
                const guild = await bot.database.findOne("guild", { 'guildId': message.guild.id });
                guild.welcome.canvasUrl = url;
                await bot.database.save(guild);

                return message.channel.send(lang.bannerChange)
            }
            else {
                return message.channel.send(lang.invalidImg)
            }
        }
        else if (cmd === "sh" || cmd === "show") {
            const guild = await bot.database.findOne("guild", { 'guildId': message.guild.id });
            let imagem = "https://github.com/Zaetic/Nayoi/blob/master/images/others/background.png?raw=true";

            if (guild.welcome.canvasUrl === "off" || guild.welcome.canvasUrl === "") message.channel.send("Banner custom `offline`");
            let check = await checkLinks([guild.welcome.canvasUrl])
            if (check[guild.welcome.canvasUrl].status === "alive") {
                imagem = guild.welcome.canvasUrl;
                message.channel.send("Banner custom `online`");
            }

            const attachment = await bot.canvas().welcomeBanner(imagem, message.member.user.avatarURL({ format: 'jpg' }), message.member.user.tag)
            return message.channel.send(`\`${lang.returnPreview}\``, attachment)
        }
        else return message.reply(lang.helpReturn)
    } catch (e) {
        bot.error.errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "banner",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}