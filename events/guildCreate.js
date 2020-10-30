const colors = require('colors');

module.exports = class{
    constructor(client){
        this.bot = client;
    }

    async run(guild){
        try{
            const guildNew = await this.bot.database.create("guild", {
                name: guild.name,
                guildId: guild.id,
                memberCount: guild.memberCount,
                createdAt: guild.joinedAt,
                server: {
                    lang: "pt-br",
                    prefix: "n!",
                    nsfw: "off"
                },
                welcome: {
                    status: "off",
                    msg: "{member}!!",
                    channel: "",
                    canvas: "off",
                    canvasUrl: "off",
                },
                autorole: {
                    status: "off",
                    role: "",
                },
                log: {
                    status: "off",
                    channel: ""
                },
                twitch: {
                    status: "off",
                    channel: ""
                }
            });
            console.log(`[Join]`.brightMagenta + ` Name:${guild.name} Users:${guild.memberCount} id:${guild.id} Date:${new Date()}`.magenta)
            await this.bot.database.save(guildNew);
    
            guild.language = this.bot.langs.getLang("pt-br");
            guild.prefix = "n!";
        }catch(e){
            this.bot.error.errorReturn(e, null, "guildCreate")
        }
    }
}