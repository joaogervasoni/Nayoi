const { MessageEmbed } = require("discord.js");
const { limitLength, returnNull } = require("../utils/functions.js");
const colors = require('colors');
var api = require('twitch-api-v5');
const { twitchID, prefix } = require("../botconfig.json");
api.clientID = twitchID;

module.exports = async (bot) => {
    bot.user.setActivity(`nayoi.com | n!help`, {type: "PLAYING"});
    for await (let guild of bot.guilds.cache.array()) {

        let lang = undefined;
        let prefixDb = prefix;
        let guildDb = await bot.database.findOne("guild", { 'guildId': guild.id });
        if(guildDb){
            lang = guildDb.server.lang;
            prefixDb = guildDb.server.prefix;
        } 
        
        if(!prefixDb) prefixDb = prefix;
        if(!lang) {
            lang = "pt-br";
            guildDb.server.lang = lang;
            await bot.database.save(guildDb);
        }
        guild.language = bot.langs.getLang(lang);
        guild.prefix = prefixDb;
    }
    console.log(`[Lang]`.brightGreen +` Carregadas em todos os servidores`.green);
    console.log(`[Online]`.brightGreen +` ${bot.user.username} esta Online em ${bot.guilds.cache.size} servidores`.green);
  
    async function mutes(){
        let mutes = await bot.database.find("mute", {});

        for (let index = 0; index < mutes.length; index++){
            const element = mutes[index];
            let time = element.date - new Date().getTime();

            setTimeout(async function(){
                let guild = bot.guilds.cache.get(element.guildId);
                let member = guild.members.cache.get(element.userId);
                let muterole = guild.roles.cache.find(role => role.name === "Muted");
                if(!muterole) return

                member.roles.remove(muterole.id);
                await bot.database.findOneAndRemove("mute", { 'guildId': guild.id, 'userId': member.user.id })
                
                member.send(`<@${member.user.id}> Unmuted`);
            }, time)
        }
    }

    async function notices(){
        let notices = await bot.database.find("notice", {});

        for (let index = 0; index < notices.length; index++) {
            const element = notices[index];
            let time = element.date - new Date().getTime();
            
            setTimeout(async function(){
                let noticeCheck = await bot.database.findOne("notice", { 'channelId': element.channelId, 'guildId': element.guildId, 'text': element.text });
                if(returnNull(noticeCheck)) return

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
    
                await bot.database.findOneAndRemove("notice", { 'channelId': element.channelId, 'guildId': element.guildId, 'text': element.text});
            }, time);
        }
    }

    async function twitch() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 60000));
            
            let streamer = await bot.database.find("twitchchannel", {});
            
            for (let index = 0; index < streamer.length; index++){
                let twitchGuild = await bot.database.find("twitchguild", { 'streamerId': streamer[index].streamerId });

                for (let index = 0; index < twitchGuild.length; index++){
                    let guildT = await bot.database.findOne("guild", { 'guildId': twitchGuild[index].guildId });
                    if(guildT.twitch.status === "on"){
                        api.streams.channel({ channelID: twitchGuild[index].streamerId, stream_type: "live" }, (err, res) => {
    
                            if(res === undefined) {
                                return;
                            }
                            else if(res !== undefined){
                                
                                var today = new Date();
                                var streamerHoras = new Date();
                    
                                streamerHoras = res.stream.created_at;
    
                                if((new Date(today).getTime() - 65000) <= (new Date(streamerHoras).getTime())){
                                    
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
    mutes();
    notices();
    twitch();
}