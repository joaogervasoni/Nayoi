const {MessageCollector} = require('discord.js')
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const RoleReaction = require("../../models/rolereaction.js");

let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;

module.exports = {
    run: async (bot, message, args) => {
        mongoose.connect(`${bot.mongodb}`);

        let args2 = args.join(" ").slice(0, 18).split(' ').join('')
        let chat = args.join(" ").slice(19).slice(2,20);
        
        let channel = message.guild.channels.cache.find(channel => channel.id === chat )
        let fetchedMessage = await channel.messages.fetch(args2);
        
        if(fetchedMessage){
            await message.channel.send("Digite o nome do Emoji/Cargo (Ex: pepeemoji, pepecargo) ao completar todos digite '!!done'");
            let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));
            let emojiRoleMappings = new Map();
            collector.on('collect', msg => {
                let {cache} = msg.guild.emojis;
                if(msg.content.toLowerCase() === '!!done'){
                    collector.stop('done command was issue');
                    return;
                }
                let [emojiName, roleName] = msg.content.split(/,\s+/);
                if (!emojiName && !roleName) return;
                
                let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase());
                if(!emoji){
                    msg.channel.send("Emoji não existe");
                    return ;
                }
                let role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
                if(!role){
                    msg.channel.send("Role não existe");
                    return ;
                }
                fetchedMessage.react(emoji)
                emojiRoleMappings.set(emoji.id, role.id)
            });
            collector.on('end', async(collected, reason) => {
                let findMsgDocument = await RoleReaction.findOne({ 'messageId': fetchedMessage.id});
                if(findMsgDocument){
                    message.channel.send("Já existe, não foi salva");
                }
                const roleReactionNew = new RoleReaction({
                    _id: mongoose.Types.ObjectId(),
                    messageId: fetchedMessage.id,
                    emojiRoleMappings: emojiRoleMappings
                });
                roleReactionNew.save()
            })
        }
    }, 
}

module.exports.help = {
    name: "addreactions"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}