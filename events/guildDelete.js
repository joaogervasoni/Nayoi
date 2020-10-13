const colors = require('colors');

module.exports = async (bot, guild) => {
    try{
        await bot.database.findOneAndRemove("guild", { 'guildId': guild.id });
        await bot.database.deleteMany("rolereaction", { 'guildId': guild.id });
        await bot.database.deleteMany("autodeletemsg", { 'guildId': guild.id });

        let streamer = await bot.database.find("twitchchannel", {});
        for (let index = 0; index < streamer.length; index++){
            let twitchGuild = await bot.database.find("twitchguild", { 'streamerId': streamer[index].streamerId, 'guildId': guild.id });
            if(twitchGuild){
                await bot.database.findOneAndRemove("twitchguild", { 'streamerId': streamer[index].streamerId, 'guildId': guild.id});
                streamer[index].servers = parseInt(streamer[index].servers) - 1;
                await bot.database.save(streamer[index]);
            }
        }
        
        console.log(`[Left]`.brightYellow + ` Name:${guild.name} Users:${guild.memberCount} id:${guild.id} Date:${new Date()}`.yellow)
    }catch(e){
        bot.error.errorReturn(e, null, "guildDelete")
    }
}