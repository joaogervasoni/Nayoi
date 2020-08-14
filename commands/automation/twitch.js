const mongoose = require('mongoose');
const {MessageEmbed} = require('discord.js');
const {errorReturn, returnNull, formatChannelId} = require("../../utils/functions.js");
const TwitchChannel = require("../../models/twitchchannel.js");
const TwitchGuild = require("../../models/twitchguild.js");
const { twitchID } = require("../../botconfig.json");
var api = require('twitch-api-v5');
api.clientID = twitchID;

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];
        let infos = null;

        if(returnNull(cmd)) return message.reply(lang.helpReturn);

        if(cmd === "on"){
            if(returnNull(subcmd)) return message.reply(lang.helpReturn);
            let channel = formatChannelId(subcmd);
            let chat = await message.guild.channels.cache.find(chat => channel, `id` );
            if (!chat || chat === undefined || chat === null) return message.reply(lang.returnNull);

            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.twitch.status === "on") return message.channel.send(`${lang.statusOk} \`${guild.twitch.status}\``);
            
            guild.twitch.status = "on";
            guild.twitch.channel = channel;
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${guild.twitch.status}\` :sunglasses:`);
            });
        }
        else if(cmd === "off"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.twitch.status === "off") return message.channel.send(`${lang.statusOk} \`${guild.twitch.status}\``);
        
            guild.twitch.status = "off";
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send(`${lang.statusNew} \`${guild.twitch.status}\` :cry:`);
            });
        }
        else if(cmd === "add"){
            if(returnNull(subcmd)) return message.reply(lang.helpReturn);
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            
            let channel = await message.guild.channels.cache.find(chat => guild.twitch.channel, `id` );
            if (returnNull(channel) || guild.twitch.status === "off") return message.reply(lang.notActived);

            api.search.channels({ query: subcmd, limit:"100" }, (err, res) => {
                if(err) {
                    console.log(err);
                } else {
                    if(returnNull(res)){
                        return message.channel.send(lang.notFound)
                    }
                    else if (!returnNull(res)){
                        infos = res.channels.find(channel => channel.display_name.toLowerCase() === subcmd.toLowerCase())
                        
                        if(twitchDB(infos, message)){
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

            let twitchGuild = await TwitchGuild.find({ 'streamerId': subcmd, 'guildId': message.guild.id });
            if(!twitchGuild) return message.channel.send(lang.notFound)

            await TwitchGuild.findOneAndRemove({ 'streamerId': subcmd, 'guildId': message.guild.id});
            let twitchChannel = await TwitchChannel.findOne({ 'streamerId': subcmd});
            twitchChannel.servers = parseInt(twitchChannel.servers) - 1;
            twitchChannel.save(function (err){
                if(err) return message.channel.send(errorReturn(err, message, cmd))
                if(!err) return message.channel.send(lang.delete)
            })
            
        }
        else if(cmd === "show"){
            let twitchGuild = await TwitchGuild.find({ 'guildId': message.guild.id})
            let description = "";

            twitchGuild.forEach(element =>  {
                description = description + "**Streamer:** `"+element.name+"` - Status: `"+element.config.status+"` - ID: `"+element.streamerId+"`\n"
            });

            const embed = new MessageEmbed()
                .setTitle(`Twitch Channels`)
                .setDescription(description)
                .setTimestamp()
                .setColor(bot.baseColor)

            return message.channel.send(embed)
        }
        else if(cmd === "msg"){
            if(returnNull(subcmd)) return message.reply(lang.helpReturn);

            let twitchGuild2 = await TwitchGuild.findOne({ 'streamerId': subcmd, 'guildId': message.guild.id });
            if(!twitchGuild2) return message.channel.send(lang.notFound)

            let length = cmd.length + subcmd.length;
            length = args.join(" ").slice(length+2);

            twitchGuild2.config.text = length;
            twitchGuild2.save(function (err){
                if(err) return message.channel.send(errorReturn(err, message, cmd))
                if(!err) return message.channel.send(lang.textChanged)
            })
        }
        else if(cmd === "ch" || cmd === "channel"){
            let channel = formatChannelId(subcmd);
            let chat = await message.guild.channels.cache.find(chat => channel, `id` );
            if (returnNull(chat)) return message.reply(lang.returnNull);

            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            guild.twitch.channel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(errorReturn(err, message, cmd))
                if(!err) return message.channel.send(lang.channelChange)
            })
        }
        else return message.reply(lang.helpReturn);

    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

async function twitchDB(infos, message){
    const twitchChannelCheck = await TwitchChannel.findOne({ 'streamerId': infos._id});
    if(!returnNull(twitchChannelCheck)){
        twitchChannelCheck.servers = parseInt(twitchChannelCheck.servers) + 1;
        twitchChannelCheck.save();
    }else{
        const twitchChannel = new TwitchChannel({
            _id: mongoose.Types.ObjectId(),
            name: infos.name,
            streamerId: infos._id,
            servers: 1
        });
        twitchChannel.save();
    }

    const twitchGuild = new TwitchGuild({
        _id: mongoose.Types.ObjectId(),
        guildId: message.guild.id,
        streamerId: infos._id,
        name: infos.name,
        config:{
            status: "on",
            creator: message.member.user.tag,
            text: "Live On"
        }
    });
    twitchGuild.save()
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