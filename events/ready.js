const { MessageEmbed } = require("discord.js");
const { limitLength } = require("../utils/functions.js");
const TwitchChannel = require("../models/twitchchannel.js");
const TwitchGuild = require("../models/twitchguild.js");
const Notice = require("../models/notice.js");
var colors = require('colors');
var api = require('twitch-api-v5');
const { twitchID } = require("../botconfig.json");
api.clientID = twitchID;

module.exports = async (bot) => {
    bot.user.setActivity(`nayoi.com | n!help`, {type: "PLAYING"});
    for await (let guild of bot.guilds.cache.array()) {

        let lang = undefined;
        let guildDb = await bot.Guild.findOne({ 'guildId': guild.id });
        if(guildDb) lang = guildDb.server.lang;
        
        if (!lang || lang === undefined) {
            lang = "pt-br";
            guildDb.server.lang = lang;
            guildDb.save();
        }
        guild.language = bot.locales.get(lang);
    }
    console.log(`[Lang]`.brightGreen +` Carregadas em todos os servidores`.green);
    console.log(`[Online]`.brightGreen +` ${bot.user.username} esta Online em ${bot.guilds.cache.size} servidores`.green);
  
    async function notices(){
        let notices = await Notice.find({});

        for (let index = 0; index < notices.length; index++) {
            const element = notices[index];
            let time = element.date - new Date().getTime();

            setTimeout(async function(){
                let guild = bot.guilds.cache.get(element.guildId);
                let channel = guild.channels.cache.get(element.channelId);

                if (element.textType === "embed"){
                    let msgSplit = element.text.split("||");

                    let text = new MessageEmbed()
                    .setTitle(limitLength(msgSplit[0], "title"))
                    .setDescription(msgSplit[1])
                    .setColor(bot.baseColor)

                    channel.send(text)
                }else{
                    channel.send(element.text)
                }
    
                await Notice.findOneAndRemove({ 'channelId': element.channelId, 'guildId': element.guildId, 'text': element.text});
            }, time);
        }
    }

    async function twitch() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 60000));
            
            let streamer = await TwitchChannel.find({});
            
            for (let index = 0; index < streamer.length; index++){
                let twitchGuild = await TwitchGuild.find({ 'streamerId': streamer[index].streamerId });

                for (let index = 0; index < twitchGuild.length; index++){
                    let guildT = await bot.Guild.findOne({ 'guildId': twitchGuild[index].guildId });
                    if(guildT.twitch.status === "on"){
                        api.streams.channel({ channelID: twitchGuild[index].streamerId, stream_type: "live" }, (err, res) => {
    
                            if(res === undefined) {
                                return;
                            }
                            else if(res !== undefined){
                                
                                var today = new Date();
                                var streamerHoras = new Date();
                    
                                streamerHoras = res.stream.created_at;
    
                                if((new Date(today).getTime() - 60000) <= (new Date(streamerHoras).getTime())){
                                    
                                    let guild = bot.guilds.cache.get(guildT.guildId);
                                    let channel = guild.channels.cache.get(guildT.twitch.channel);
                                    
                                    let embed = `> **${res.stream.channel.status}** \n`
                                    //+`Iniciando as: ${new Date(streamerHoras).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}\n`
                                    +`${twitchGuild[index].config.text} \n`
                                    +`Link para o Stream: ${res.stream.channel.url}\n`
    
                                    return channel.send(embed)
                                }
                            }  
                        });
                    }
                    
                }   
            }  
        }
    }
    notices();
    twitch();
}