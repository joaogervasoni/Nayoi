module.exports = async (bot, channel) => {
    try{
        const guildWelcome = await bot.database.findOne("guild", { 'welcome.channel': channel.id });
        if(guildWelcome){
            guildWelcome.welcome.status = "off";
            await bot.database.save(guildWelcome);
        }
    
        const guildLog = await bot.database.findOne("guild", { 'log.channel': channel.id });
        if(guildLog){
            guildLog.log.status = "off";
            await bot.database.save(guildLog);
        }

        const guildTwitch = await bot.database.findOne("guild", { 'twitch.channel': channel.id });
        if(guildTwitch){
            guildTwitch.twitch.status = "off";
            bot.database.save(guildTwitch);
        }

        await bot.database.deleteMany("rolereaction", { 'channelId': channel.id })
        await bot.database.findOneAndDelete("autodeletemsg", { 'channelId': channel.id });
    }catch(e){
        bot.error.errorReturn(e, null, "channelDelete");
    }
}