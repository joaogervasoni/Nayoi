const { MessageEmbed } = require('discord.js');
const { formatId } = require("../../utils/functions.js");
const { twitchID } = require("../../botconfig.json");
var api = require('twitch-api-v5');
api.clientID = twitchID;

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];
        let infos = null;

        if(!cmd) return message.reply(lang.helpReturn);

        if(cmd === "on"){
            if(!subcmd) return message.reply(lang.helpReturn);
            let channel = formatId(subcmd);
            let chat = await message.guild.channels.cache.find(chat => chat.id === channel);
            if (!chat || chat === undefined || chat === null) return message.reply(lang.returnNull);

            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            if (guild.twitch.status === "on") return message.channel.send(`${lang.statusOk} \`${guild.twitch.status}\``);
            
            guild.twitch.status = "on";
            guild.twitch.channel = channel;
            await bot.database.save(guild);
            
            return message.channel.send(`${lang.statusNew} \`${guild.twitch.status}\` :sunglasses:`);
        }
        else if(cmd === "off"){
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            if (guild.twitch.status === "off") return message.channel.send(`${lang.statusOk} \`${guild.twitch.status}\``);
        
            guild.twitch.status = "off";
            await bot.database.save(guild);

            return message.channel.send(`${lang.statusNew} \`${guild.twitch.status}\` :cry:`);
        }
        else if(cmd === "add"){
            if(!subcmd) return message.reply(lang.helpReturn);
            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            
            let channel = await message.guild.channels.cache.find(chat => chat.id === guild.twitch.channel);
            if (!channel || guild.twitch.status === "off") return message.reply(lang.notActived);

            let twitchGuild = await bot.database.find("twitchguild", { 'streamerId': subcmd, 'guildId': message.guild.id });
            if(twitchGuild) return message.channel.send(lang.exist);

            api.search.channels({ query: subcmd, limit:"100" }, (err, res) => {
                if(err) {
                    console.log(err);
                } else {
                    if(!res){
                        return message.channel.send(lang.notFound)
                    }
                    else if (res){
                        infos = res.channels.find(channel => channel.display_name.toLowerCase() === subcmd.toLowerCase())
                        if(!infos) return message.channel.send(lang.notFound)
                        
                        if(twitchDB(infos, message, bot)){
                            message.channel.send(lang.success);
                            const embed = new MessageEmbed()
                            .setThumbnail(infos.logo)
                            .setTitle(infos.display_name)
                            .addField("Url:" , infos.url)
                            .addField("Followers:" , infos.followers)
                            .setColor(bot.baseColor)
                            .setTimestamp()

                            return message.channel.send(embed);
                        }else return message.channel.send(lang.error);
                    }
                }
            });
        }
        else if(cmd === "remove"){

            let twitchGuild = await bot.database.find("twitchguild", { 'streamerId': subcmd, 'guildId': message.guild.id });
            if(!twitchGuild) return message.channel.send(lang.notFound)

            await bot.database.findOneAndRemove("twitchguild", { 'streamerId': subcmd, 'guildId': message.guild.id});
            let twitchChannel = await bot.database.findOne("twitchchannel", { 'streamerId': subcmd});
            twitchChannel.servers = parseInt(twitchChannel.servers) - 1;
            
            await bot.database.save(twitchChannel)
            return message.channel.send(lang.delete)
        }
        else if(cmd === "show"){
            let twitchGuild = await bot.database.find("twitchguild", { 'guildId': message.guild.id})
            let description = "";

            if(twitchGuild) {
                twitchGuild.forEach(element =>  {
                    description = description + "**Streamer:** `"+element.name+"` - Status: `"+element.config.status+"` - ID: `"+element.streamerId+"`\n"
                });
            }else{
                description = lang.nullStreamers;
            }

            const embed = new MessageEmbed()
                .setTitle(`Twitch Channels`)
                .setDescription(description)
                .setTimestamp()
                .setColor(bot.baseColor)

            return message.channel.send(embed)
        }
        else if(cmd === "msg"){
            if(!subcmd) return message.reply(lang.helpReturn);

            let twitchGuild2 = await bot.database.findOne("twitchguild", { 'streamerId': subcmd, 'guildId': message.guild.id });
            if(!twitchGuild2) return message.channel.send(lang.notFound)

            let length = cmd.length + subcmd.length;
            length = args.join(" ").slice(length+2);

            twitchGuild2.config.text = length;
            await bot.database.save(twitchGuild2);
                
            return message.channel.send(lang.textChanged)
        }
        else if(cmd === "ch" || cmd === "channel"){
            let channel = formatId(subcmd);
            let chat = await message.guild.channels.cache.find(chat => chat.id === channel);
            if (!chat) return message.reply(lang.returnNull);

            const guild = await bot.database.findOne("guild", {'guildId': message.guild.id});
            guild.twitch.channel = channel;
            await bot.database.save(guild);
            
            return message.channel.send(lang.channelChange)
        }
        else return message.reply(lang.helpReturn);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
}

async function twitchDB(infos, message, bot){
    const twitchChannelCheck = await bot.database.findOne("twitchchannel", { 'streamerId': infos._id});
    if(twitchChannelCheck){
        twitchChannelCheck.servers = parseInt(twitchChannelCheck.servers) + 1;
        await bot.database.save(twitchChannelCheck);
    }else{
        const twitchChannel = await bot.database.create("twitchchannel", {
            name: infos.name,
            streamerId: infos._id,
            servers: 1
        });
        await bot.database.save(twitchChannel);
    }

    const twitchGuild = await bot.database.create("twitchguild", {
        guildId: message.guild.id,
        streamerId: infos._id,
        name: infos.name,
        config:{
            status: "on",
            creator: message.member.user.tag,
            text: "Live On"
        }
    });
    await bot.database.save(twitchGuild)
    return true;
}

module.exports.help = {
    name: "twitch",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}