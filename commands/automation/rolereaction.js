const {MessageCollector, MessageEmbed} = require('discord.js');
const {listCollection, returnNull, limitLength, formatId, formatEmojiId} = require("../../utils/functions.js");

let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;

module.exports.run = async (bot, message, args, lang) => {
    try{
        if(!args[0]) return message.reply(lang.helpReturn);

        let channel = await message.guild.channels.cache.find(channel => channel.id === formatId(args[0]))
        let idmsg;
        
        if(returnNull(channel)) return message.reply(lang.returnNullChannel);
        if(channel){
            let embed = new MessageEmbed()
                        .setTitle(lang.embedInitiatedTitle)
                        .setDescription(lang.embedInitiatedDescription)
                        .addField(lang.embedInitiatedField1, lang.embedInitiatedField1_1)
                        .setColor(bot.baseColor)
            await message.channel.send(embed);

            let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message), {time: 200000 , errors: ['time']});
            let emojiRoleMappings = new Map();
            var emojiEmoji = [];
            var msgAenviar;
            const emojis = listCollection(bot.lists, "emojis");

            collector.on('collect', async msg => {
                let {cache} = msg.guild.emojis;
                if(msg.content.toLowerCase() === '!!stop'){
                    collector.stop('client stop the command');
                    await message.channel.send(lang.stopMsg)
                    return;
                }
                if(msg.content.toLowerCase() === '!!clear'){
                    msgAenviar = null;
                    await message.channel.send(lang.clearMsg); 
                    return;
                }
                if(msg.content.toLowerCase() === '!!done'){
                    
                    let embed = new MessageEmbed()
                        .setTitle(limitLength(msgAenviar[0], "title"))
                        .setDescription(msgAenviar[1])
                        .setColor(bot.baseColor)
                    
                    let msg = await channel.send(embed);
                    idmsg = msg;

                    emojiEmoji.forEach(element => {
                        let emojiN = emojis.find(em => em === element);

                        if (emojiN){
                            idmsg.react(emojiN)
                        }else{
                            let emoji = cache.find(emoji => emoji.id === element);
                            idmsg.react(emoji) 
                        }
                    });

                    await message.channel.send(lang.roleMsgCreated);
                    collector.stop('done command was issue');
                    return;
                }
                if(!msgAenviar){
                    msgAenviar = [x, y] = msg.content.split(/,\s+/);
                    let embed = new MessageEmbed()
                        .setTitle(lang.embedSaveTitle)
                        .setDescription(lang.embedSaveDescription)
                        .addField(lang.embedSaveField1, lang.embedSaveField1_1)
                        .addField(lang.embedSaveField2, lang.embedSaveField2_1)
                        .setColor(bot.baseColor)
                    
                    await message.channel.send(embed);
                }
                else{

                    let [emojiid, roleid] = msg.content.split(/,\s+/);
                    if (!emojiid && !roleid) return;

                    let emoji = cache.find(emoji => emoji.id === formatEmojiId(emojiid));
                    let tst = emojiid.split(/ +/g);
                    let emojiN = emojis.find(em => em === tst[0]);

                    if(!emoji && !emojiN){ 
                        msg.channel.send(lang.returnEmojiNull); 
                        return;
                    }

                    let role = msg.guild.roles.cache.find(role => role.id === formatId(roleid));
                    if(!role){ msg.channel.send(lang.returnRoleNull); return ;}
                    if(role.rawPosition > message.member.roles.highest.rawPosition || !message.member.hasPermission("ADMINISTRATOR")) {
                        msg.channel.send(lang.returnRoleHigh); 
                        return
                    }

                    if(!emoji){
                        emojiEmoji.push(emojiN)
                        emojiRoleMappings.set(emojiN, role.id)
                        await message.channel.send(lang.returnSave)
                    }else{
                        emojiEmoji.push(emoji.id)
                        emojiRoleMappings.set(emoji.id, role.id)
                        await message.channel.send(lang.returnSave)
                    }
                }
            });

            collector.on('end', async(collected, reason) => {
                if(reason === "time") return message.channel.send(lang.limitTime)
                if(!idmsg) return
                
                let findMsgDocument = await bot.database.findOne("rolereaction", { 'messageId': idmsg.id});
                if(findMsgDocument) message.channel.send(lang.returnExist);

                const roleReactionNew = await bot.database.create("rolereaction", {
                    guildId: message.guild.id,
                    messageId: idmsg.id,
                    emojiRoleMappings: emojiRoleMappings
                });
                await bot.database.save(roleReactionNew);
            })
        }  
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name);       
    }
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