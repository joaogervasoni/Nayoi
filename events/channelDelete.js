module.exports = class {
    constructor(client){
        this.bot = client;
    }

    async run(channel){
        try{
            const guildWelcome = await this.bot.database.findOne("guild", { 'welcome.channel': channel.id });
            if(guildWelcome){
                guildWelcome.welcome.status = "off";
                await this.bot.database.save(guildWelcome);
            }
        
            const guildLog = await this.bot.database.findOne("guild", { 'log.channel': channel.id });
            if(guildLog){
                guildLog.log.status = "off";
                await this.bot.database.save(guildLog);
            }
    
            const guildTwitch = await this.bot.database.findOne("guild", { 'twitch.channel': channel.id });
            if(guildTwitch){
                guildTwitch.twitch.status = "off";
                this.bot.database.save(guildTwitch);
            }
    
            await this.bot.database.deleteMany("rolereaction", { 'channelId': channel.id })
            await this.bot.database.findOneAndDelete("autodeletemsg", { 'channelId': channel.id });
        }catch(e){
            this.bot.error.errorReturn(e, null, "channelDelete");
        }
    }
}