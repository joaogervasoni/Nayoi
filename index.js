const { token, prefix, twitchID } = require("./botconfig.json");
const { Client, Collection, MessageEmbed } = require("discord.js");
const Guild = require("./models/guild");
const TwitchChannel = require("./models/twitchchannel.js");
const TwitchGuild = require("./models/twitchguild.js");
const fs = require("fs");
var colors = require('colors');
var api = require('twitch-api-v5');
api.clientID = twitchID;

const bot = new Client({disabledEveryone: true, partials: ['MESSAGE', 'REACTION']})

bot.Guild = Guild;
bot.snipes = new Map();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.lists = new Collection();
bot.locales = new Collection();
bot.prefix = prefix;
bot.baseColor = "#ff8ff2";
bot.database = require('./utils/database.js');
bot.langs = require('./utils/langs');

const commands = require("./structures/command");
commands.run(bot);

const events = require("./structures/event");
events.run(bot);

const lists = require("./structures/list");
lists.run(bot);

const langs = require("./structures/lang");
langs.run(bot);

bot.on("ready", async () =>{
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

    async function twitch() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 60000));
            
            let streamer = await TwitchChannel.find({});
            
            for (let index = 0; index < streamer.length; index++){
                let twitchGuild = await TwitchGuild.find({ 'streamerId': streamer[index].streamerId });

                for (let index = 0; index < twitchGuild.length; index++){
                    let welcomeGuild = await bot.Guild.findOne({ 'guildId': twitchGuild[index].guildId });

                    api.streams.channel({ channelID: twitchGuild[index].streamerId, stream_type: "live" }, (err, res) => {
    
                        if(res === undefined) {
                            return;
                        }
                        else if(res !== undefined){
                            
                            var today = new Date();
                            var streamerHoras = new Date();
                
                            streamerHoras = res.stream.created_at;

                            if((new Date(today).getTime() - 60000) <= (new Date(streamerHoras).getTime())){
                                
                                let guild = bot.guilds.cache.get(welcomeGuild.guildId);
                                let channel = guild.channels.cache.get(welcomeGuild.twitch.channel);
                                
                                let embed = `> **====== ${res.stream.channel.status} ======** \n`
                                +`Iniciando as: ${new Date(streamerHoras).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}\n`
                                +`Te espero lá !! \n`
                                +`Link para o Stream: ${res.stream.channel.url}\n`

                                return channel.send(embed)
                            }
                        }  
                    });
                }   
            }  
        }
    }
    twitch();

})

bot.login(token);