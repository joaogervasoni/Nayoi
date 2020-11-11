const chalk = require('chalk');
const colors = require('colors');

class Checks {
    constructor(client, options = {clear: false}){
        this.bot = client;
        this.options = options;
    }

    async init() {
        if(this.options.clear === false) return console.log(chalk.red(chalk.redBright('[Checks]'), 'Limpeza de lixos desabilitada'));

        /*
        !!!! CAUTION !!!! CAUTION !!!! CAUTION !!!! CAUTION !!!!
        */

        for await (let guild of this.bot.guilds.cache.array()) {
            let guildDb = await this.bot.database.findOne("guild", { 'guildId': guild.id });

            this.clearFalseRole(guild, guildDb);
            this.clearFalseMute(guild);
            this.clearFalseRoleReaction(guild);
        }

        return console.log(chalk.red(chalk.redBright('[Checks]'), 'Limpeza de lixos feita'));

        /*
        !!!! CAUTION !!!! CAUTION !!!! CAUTION !!!! CAUTION !!!!
        */
    }

    async clearFalseRoleReaction(guild) {
        let rr = await this.bot.database.find("rolereaction", { 'guildId': guild.id });
    
        if(rr){
            for (let index = 0; index < rr.length; index += 1 ) {
                const element = rr[index];

                const channel = await guild.channels.cache.get(element.channelId);
                if(!channel) return await this.bot.database.findOneAndRemove("rolereaction", { 'guildId': guild.id, 'channelId': element.channelId });

                const message = await channel.messages.fetch(element.messageId);
                if(!message) return await this.bot.database.findOneAndRemove("rolereaction", { 'guildId': guild.id, 'messageId': element.messageId });
            }
        }
    }

    async clearFalseMute(guild) {
        let mute = await this.bot.database.find("mute", { 'guildId': guild.id });

        if(mute){
            for (let index = 0; index < mute.length; index += 1) {
                const element = mute[index];
                
                const user = await guild.members.cache.get(element.userId);
                if(!user) await this.bot.database.findOneAndRemove("mute", { 'guildId': guild.id, 'userId': member.userId })
            }
        }
    }

    async clearFalseRole(guild, guildDb) {
        let role = guildDb.autorole.role;
        
        if(role){
            let roleGuild = await guild.roles.cache.get(role);
            if(!roleGuild){
                guildDb.autorole.status = "off",
                guildDb.autorole.role = "",
                this.bot.database.save(guildDb);
            }
        }
    }
}

module.exports = Checks;
