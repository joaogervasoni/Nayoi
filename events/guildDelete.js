const {errorReturn} = require("../functions.js");
var colors = require('colors');

module.exports = async (bot, guild) => {
    try{
        bot.database;
        await bot.Guild.findOneAndRemove({ 'guildId': guild.id });

        console.log(`Servidor saiu !! Nome:${guild.name} id:${guild.id}`.yellow)
    }catch(e){
        errorReturn(e, null, "guildDelete")
    }
}