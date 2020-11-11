const { MessageEmbed } = require("discord.js");
const { limitLength, returnNull } = require("../utils/functions.js");
const chalk = require('chalk');
const api = require('twitch-api-v5');
const Checks = require("../src/structures/checks");

module.exports = class {
    constructor(client) {
        this.bot = client;
    }

    async run() {
        const { twitchID } = this.bot.apis;
        const prefix = this.bot.prefix;
        api.clientID = twitchID;
    
        this.bot.user.setActivity(`nayoi.com | n!help`, {type: "PLAYING"});
        for await (let guild of this.bot.guilds.cache.array()) {
    
            let lang = undefined;
            let prefixDb = prefix;
            let guildDb = await this.bot.database.findOne("guild", { 'guildId': guild.id });
            if(guildDb){
                lang = guildDb.server.lang;
                prefixDb = guildDb.server.prefix;
            } 
            
            if(!prefixDb) prefixDb = prefix;
            if(!lang) {
                lang = "pt-br";
                guildDb.server.lang = lang;
                await this.bot.database.save(guildDb);
            }
            guild.language = this.bot.langs.getLang(lang);
            guild.prefix = prefixDb;
        }
        await new Checks(this.bot, {clear: false}).init();

        console.log(chalk.green(chalk.greenBright('✔️ [Lang]'), 'Carregadas em todos os servidores'));
        console.log(chalk.green(chalk.greenBright('✔️ [Online]'), `${this.bot.user.username} esta Online em ${this.bot.guilds.cache.size} servidores`));

        this.mutes();
        this.notices();
        this.twitch();
    }

    async mutes(){
        let mutes = await this.bot.database.find("mute", {});

        for (let index = 0; index < mutes.length; index++){
            const element = mutes[index];
            let time = element.date - new Date().getTime();

            setTimeout(async function(){
                let guild = this.bot.guilds.cache.get(element.guildId);
                let member = guild.members.cache.get(element.userId);
                let muterole = guild.roles.cache.find(role => role.name === "Muted");
                if(!muterole) return

                member.roles.remove(muterole.id);
                await this.bot.database.findOneAndRemove("mute", { 'guildId': guild.id, 'userId': member.user.id })
                
                member.send(`<@${member.user.id}> Unmuted`);
            }, time)
        }
    }

    async notices(){
        let notices = await this.bot.database.find("notice", {});

        for (let index = 0; index < notices.length; index++) {
            const element = notices[index];
            let time = element.date - new Date().getTime();
            
            setTimeout(async function(){
                let noticeCheck = await this.bot.database.findOne("notice", { 'channelId': element.channelId, 'guildId': element.guildId, 'text': element.text });
                if(returnNull(noticeCheck)) return

                let guild = this.bot.guilds.cache.get(element.guildId);
                let channel = guild.channels.cache.get(element.channelId);

                if (element.textType === "embed"){
                    let msgSplit = element.text.split("||");

                    let text = new MessageEmbed()
                    .setTitle(limitLength(msgSplit[0], "title"))
                    .setDescription(msgSplit[1])
                    .setColor(this.bot.baseColor)

                    channel.send(text)
                }else{
                    channel.send(element.text)
                }
    
                await bot.database.findOneAndRemove("notice", { 'channelId': element.channelId, 'guildId': element.guildId, 'text': element.text});
            }, time);
        }
    }

    async twitch(){
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 60000));
            
            let streamer = await this.bot.database.find("twitchchannel", {});
            
            for (let index = 0; index < streamer.length; index++){
                let twitchGuild = await this.bot.database.find("twitchguild", { 'streamerId': streamer[index].streamerId });

                for (let index = 0; index < twitchGuild.length; index++){
                    let guildT = await this.bot.database.findOne("guild", { 'guildId': twitchGuild[index].guildId });
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
                                    
                                    let guild = this.bot.guilds.cache.get(guildT.guildId);
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
};