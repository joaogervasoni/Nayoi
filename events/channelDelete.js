const { errorReturn } = require("../utils/functions.js");
const AutoDeleteMsg = require("../models/autodeletemsg");
const RoleReaction = require("../models/rolereaction.js");

module.exports = async (bot, channel) => {
    try{
        const guildWelcome = await bot.Guild.findOne({ 'welcome.channel': channel.id });
        if(guildWelcome){
            guildWelcome.welcome.status = "off";
            guildWelcome.save()
        }
    
        const guildLog = await bot.Guild.findOne({ 'log.channel': channel.id });
        if(guildLog){
            guildLog.log.status = "off";
            guildLog.save()
        }

        await RoleReaction.deleteMany({ 'channelId': channel.id })
        await AutoDeleteMsg.findOneAndDelete({ 'channelId': channel.id });
    }catch(e){
        errorReturn(e, null, "channelDelete");
    }
}