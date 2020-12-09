module.exports = class {
    constructor(client){
        this.bot = client;
    }   

    async run (oldGuild, newGuild){
        if(oldGuild.name === newGuild.name) return
        if(!oldGuild || !newGuild) return

        try{
            if(oldGuild.name !== newGuild.name){
                let guild = await this.bot.database.findOne("guild", {'guildId': newGuild.id});
    
                guild.name = newGuild.name;
                return await this.bot.database.save(guild);
            }
        }catch(e){
            this.bot.error.errorReturn(e, null, "guildUpdate");
        }
    }
}
