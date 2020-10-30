const colors = require('colors');

module.exports = class{
    constructor(client){
        this.bot = client;
    }

    async run(guild){
        try{
            await this.bot.database.findOneAndRemove("guild", { 'guildId': guild.id });
            await this.bot.database.deleteMany("rolereaction", { 'guildId': guild.id });
            await this.bot.database.deleteMany("autodeletemsg", { 'guildId': guild.id });
    
            let streamer = await this.bot.database.find("twitchchannel", {});
            for (let index = 0; index < streamer.length; index++){
                let twitchGuild = await this.bot.database.find("twitchguild", { 'streamerId': streamer[index].streamerId, 'guildId': guild.id });
                if(twitchGuild){
                    await this.bot.database.findOneAndRemove("twitchguild", { 'streamerId': streamer[index].streamerId, 'guildId': guild.id});
                    streamer[index].servers = parseInt(streamer[index].servers) - 1;
                    await this.bot.database.save(streamer[index]);
                }
            }
            
            console.log(`[Left]`.brightYellow + ` Name:${guild.name} Users:${guild.memberCount} id:${guild.id} Date:${new Date()}`.yellow)
        }catch(e){
            this.bot.error.errorReturn(e, null, "guildDelete")
        }
    }
}