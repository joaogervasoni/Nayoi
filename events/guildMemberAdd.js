const checkLinks = require('check-links');

module.exports = class {
    constructor(client) {
        this.bot = client;
    }

    async run(member) {
        try {
            const lang = await this.bot.langs.langReturn(member.guild.language, "guildMemberAdd", "event");
            const guild = await this.bot.database.findOne("guild", { 'guildId': member.guild.id });

            //MemberCount
            if (member.guild.memberCount) {
                guild.memberCount = member.guild.memberCount;
                await this.bot.database.save(guild);
            }

            //Autorole
            if (guild.autorole.status === "on") {
                let rol = guild.autorole.role;
                if (rol) member.roles.add(rol);
            }

            //Welcome
            if (guild.welcome.status === "on") {
                let wlchat = member.guild.channels.cache.get(guild.welcome.channel)
                let msg = guild.welcome.msg;

                msg = msg.replace(/{member}/g, member);
                msg = msg.replace(/{membercount}/g, member.guild.memberCount);

                if (guild.welcome.canvas === "on") {
                    let check = await checkLinks([guild.welcome.canvasUrl])
                    let imagem = "https://github.com/Zaetic/Nayoi/blob/master/images/others/background.png?raw=true";
                    let profileImage = "https://github.com/Zaetic/Nayoi/blob/master/images/others/default.png?raw=true";

                    if ((guild.welcome.canvasUrl != "off") && (check[guild.welcome.canvasUrl].status === "alive")) {
                        imagem = guild.welcome.canvasUrl;
                    }
                    if (member.user.avatar != null) profileImage = member.user.avatarURL({ format: 'jpg' });

                    const attachment = await bot.canvas().welcomeBanner(imagem, profileImage, member.user.tag)
                    return wlchat.send(msg, attachment)
                } else {
                    return wlchat.send(msg);
                }
            }
        } catch (e) {
            this.bot.error.errorReturn(e, null, "guildMemberAdd")
        }
    }
}