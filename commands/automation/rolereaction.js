const {MessageCollector, MessageEmbed} = require('discord.js');
const isColor = require('is-color');
const {listCollection, limitLength, formatId, formatEmojiId} = require("../../utils/functions.js");

let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
    
        if(cmd === "create"){
            let channel = args[1];
            if(!channel) return message.reply(lang.helpReturn);
            
            channel = await message.guild.channels.cache.find(chat => chat.id === formatId(channel));
            if(!channel) return message.reply(lang.returnNullChannel);

            const embed = new MessageEmbed()
            .setTitle(lang.embedInitiatedTitle)
            .setDescription(lang.embedInitiatedDescription)
            .addField(lang.embedInitiatedField1, lang.embedInitiatedField1_1)
            .setColor(bot.baseColor);
            await message.channel.send(embed);

            let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message), {
                time: 200000,
                error: ['time']
            });
            
            const baseEmojis = listCollection(bot.lists, "emojis");
            let rolereaction = await createRR();
            console.log(rolereaction)

            collector.on('collect', async msg =>{

                let cmdArgs = msg.content.toLowerCase().split(/ +/g);
                let cmdCollector = cmdArgs[0];
                if(cmdCollector === "!!stop"){
                    collector.stop("Collector stoped");
                    return await message.channel.send(lang.stopMsg);
                }
                else if(cmdCollector === "!!clear"){
                    rolereaction.embedMsg = null;
                    return await message.channel.send(lang.clearMsg); 
                }
                else if(cmdCollector === "!!done"){
                    let embed = new MessageEmbed()
                    .setTitle(limitLength(rolereaction.embedMsg[0], "title"))
                    .setDescription(rolereaction.embedMsg[1])
                    .setColor(rolereaction.embedColor);
                    rolereaction.sendedMsg = await channel.send(embed);

                    rolereaction.emojis.forEach(element => {
                        let emojiN = baseEmojis.find(em => em === element);

                        if (emojiN){
                            rolereaction.sendedMsg.react(emojiN)
                        }else{
                            let emoji = msg.guild.emojis.cache.find(emoji => emoji.id === element);
                            rolereaction.sendedMsg.react(emoji) 
                        }
                    });

                    await message.channel.send(lang.roleMsgCreated);
                    return collector.stop('Command done');
                }
                else if(!rolereaction.embedMsg){
                    rolereaction.embedMsg = msg.content.split(/ +/g);
                    rolereaction.embedMsg = rolereaction.embedMsg.join(" ").slice(0).split("||");

                    let embed = new MessageEmbed()
                    .setTitle(lang.embedSaveTitle)
                    .setDescription(lang.embedSaveDescription)
                    .addField(lang.embedSaveField1, lang.embedSaveField1_1)
                    .setColor(bot.baseColor);
                    
                    return await message.channel.send(embed);
                }
                else if(!rolereaction.embedColor) rolereaction.embedColor = await embedColorF(msg, lang, bot, message);
                else rolereaction = await saveEmoji(msg, rolereaction, lang, message, baseEmojis);
            });

            collector.on('end', async(collected, reason) => {
                if(reason === "time") return message.channel.send(lang.limitTime)
                if(!rolereaction.sendedMsg) return
                
                await saveDB(rolereaction, lang, bot, message);
            })
        }else return message.reply(lang.helpReturn);

    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);
    }
    /*else if(cmd === "edit"){

    }
    else if(cmd === "show"){
        let reactions = await bot.database.find("RoleReaction", { 'guildId': message.guild.id})
        console.log(reactions)
        reactions.forEach(element => {
            message.channel.send(element.messageId)
        });
    }*/
}

async function createRR(){
    let rr = {
        embedMsg: null,
        embedColor: null,
        sendedMsg: null,
        emojiRole: new Map(),
        emojis: []
    }
    return rr;
}

async function saveDB(rolereaction, lang, bot, message){
    let findMsgDocument = await bot.database.findOne("rolereaction", { 'messageId': rolereaction.sendedMsg.id});
    if(findMsgDocument) message.channel.send(lang.returnExist);

    const roleReactionNew = await bot.database.create("rolereaction", {
        guildId: message.guild.id,
        messageId: rolereaction.sendedMsg.id,
        channelId: rolereaction.sendedMsg.channel.id,
        emojiRoleMappings: rolereaction.emojiRole
    });
    await bot.database.save(roleReactionNew);
}

async function embedColorF(msg, lang, bot, message){
    if (isColor.isHex(msg.content)){
        let embedColor = msg.content;
        
        let embed = new MessageEmbed()
        .setTitle(lang.colorSaveTitle)
        .setDescription(lang.colorSaveDescription)
        .addField(lang.colorSaveField1, lang.colorSaveField1_1)
        .addField(lang.colorSaveField2, lang.colorSaveField2_1)
        .setColor(bot.baseColor);
        
        await message.channel.send(embed);
        return embedColor;
    }else{
        let embed = new MessageEmbed()
        .setTitle(lang.ColorFalseTitle)
        .setDescription(lang.ColorFalseDescription)
        .setColor(bot.baseColor);

        return await message.channel.send(embed);
    }
}

async function saveEmoji(msg, rolereaction, lang, message, baseEmojis){
    let emojisCache = msg.guild.emojis.cache;
    
    let [emojiid, roleid] = msg.content.split(/,\s+/);
    if (!emojiid && !roleid) return;

    let emoji = emojisCache.find(emoji => emoji.id === formatEmojiId(emojiid));
    let tst = emojiid.split(/ +/g);
    let emojiN = baseEmojis.find(em => em === tst[0]);
    if(!emoji && !emojiN) return msg.channel.send(lang.returnEmojiNull); 
    
    let role = msg.guild.roles.cache.find(role => role.id === formatId(roleid));
    if(!role) return msg.channel.send(lang.returnRoleNull);
    
    if(role.rawPosition > message.member.roles.highest.rawPosition || !message.member.hasPermission("ADMINISTRATOR")) 
        return msg.channel.send(lang.returnRoleHigh);

    if(!emoji){
        rolereaction.emojis.push(emojiN)
        rolereaction.emojiRole.set(emojiN, role.id)
    }else{
        rolereaction.emojis.push(emoji.id)
        rolereaction.emojiRole.set(emoji.id, role.id)
    }
    await message.channel.send(lang.returnSave)
    return rolereaction;
}

module.exports.help = {
    name: "rolereaction",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}