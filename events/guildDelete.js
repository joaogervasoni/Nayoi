const {errorReturn} = require("../utils/functions.js");
const RoleReaction = require("../models/rolereaction.js");
const AutoDeleteMsg = require("../models/autodeletemsg");
var colors = require('colors');

module.exports = async (bot, guild) => {
    try{
        bot.database;
        await bot.Guild.findOneAndRemove({ 'guildId': guild.id });
        await RoleReaction.deleteMany({ 'guildId': guild.id });
        await AutoDeleteMsg.deleteMany({ 'guildId': guild.id });

        console.log(`Servidor saiu !! Nome:${guild.name} id:${guild.id}`.yellow)
    }catch(e){
        errorReturn(e, null, "guildDelete")
    }
}