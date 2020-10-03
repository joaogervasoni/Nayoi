const RoleReaction = require("../models/rolereaction.js");
const AutoDeleteMsg = require("../models/autodeletemsg");
const TwitchGuild = require("../models/twitchguild.js")
const TwitchChannel = require("../models/twitchchannel.js")
var colors = require('colors');

module.exports = async (bot, guild) => {
    try{
        await bot.Guild.findOneAndRemove({ 'guildId': guild.id });
        await RoleReaction.deleteMany({ 'guildId': guild.id });
        await AutoDeleteMsg.deleteMany({ 'guildId': guild.id });

        let streamer = await TwitchChannel.find({});
        for (let index = 0; index < streamer.length; index++){
            let twitchGuild = await TwitchGuild.find({ 'streamerId': streamer[index].streamerId, 'guildId': guild.id });
            if(twitchGuild){
                await TwitchGuild.findOneAndRemove({ 'streamerId': streamer[index].streamerId, 'guildId': guild.id});
                streamer[index].servers = parseInt(streamer[index].servers) - 1;
                streamer[index].save();
            }
        }
        
        console.log(`[Left]`.brightYellow + ` Name:${guild.name} Users:${guild.memberCount} id:${guild.id} Date:${new Date()}`.yellow)
    }catch(e){
        bot.error.errorReturn(e, null, "guildDelete")
    }
}