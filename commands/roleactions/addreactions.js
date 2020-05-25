const {MessageCollector, MessageEmbed} = require('discord.js');
const {errorReturn, formatChannelId, formatRoleId, formatEmojiId} = require("../../functions.js");
const { prefix } = require("../../botconfig.json");
const mongoose = require('mongoose');
const RoleReaction = require("../../models/rolereaction.js");
const emojis = require('../../node_modules/emojis-list/index.js')

let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;

module.exports.run = async (bot, message, args) => {
    try{
        bot.database;

        if(!args[0]) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        let channel = await message.guild.channels.cache.find(channel => channel.id === formatChannelId(args[0]))
        let idmsg;
        
        if(!channel || channel === null || channel === undefined) return message.reply("Nenhum canal encontrado :worried: !!");
        if(channel){
            await message.channel.send("Vamos começar !!\n"
            + "Primeiro digite o que deseja mandar na msg, lembrando que o titulo e a msg devem ser dividos por **',' virgula** !!\n"
            + "`Exemplo: Um Titulo legal, Escolha a reação do pepe para receber o cargo pepe !!!`");

            let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));
            let emojiRoleMappings = new Map();
            var emojiEmoji = [];
            var msgAenviar;

            collector.on('collect', async msg => {
                let {cache} = msg.guild.emojis;
                if(msg.content.toLowerCase() === '!!done'){
                    
                    let embed = new MessageEmbed()
                        .setTitle(msgAenviar[0])
                        .setDescription(msgAenviar[1])
                        .setColor(bot.baseColor)
                    
                    let msg = await channel.send(embed);
                    idmsg = msg;

                    emojiEmoji.forEach(element => {
                        let emojiN = emojis.find(em => em === element);
                        console.log(element)
                        console.log(emojiN)
                        if (emojiN){
                            idmsg.react(emojiN)
                        }else{
                            let emoji = cache.find(emoji => emoji.id === element);
                            idmsg.react(emoji) 
                        }
                    });

                    await message.channel.send("Role Reaction e Msg criados no canal selecionado :man_mage: !!");
                    collector.stop('done command was issue');
                    return;
                }
                if(!msgAenviar){
                    msgAenviar = [x, y] = msg.content.split(/,\s+/);
                    await message.channel.send("**Mensagem salva :sunglasses:!! **\n"
                    + "Caso não tenha gostado do que digitou, digite !!clear para poder escolher novamente a msg !!\n"
                    + "Agora digite os emotes divididos por **',' virgula** `Ex: :emoji:, @cargo`\n"
                    + "O emoji deve ser mandado como vc utiliza-o normalmente, já o cargo é so marcar ele !!"); 
                }
                else{

                    let [emojiid, roleid] = msg.content.split(/,\s+/);
                    if (!emojiid && !roleid) return;

                    let emoji = cache.find(emoji => emoji.id === formatEmojiId(emojiid));
                    let tst = emojiid.split(/ +/g);
                    let emojiN = emojis.find(em => em === tst[0]);

                    if(!emoji && !emojiN){ 
                        msg.channel.send("Emoji não existe !!"); 
                        return;
                    }

                    let role = msg.guild.roles.cache.find(role => role.id === formatRoleId(roleid));
                    if(!role){ msg.channel.send("Role não existe !!"); return ;}

                    if(!emoji){
                        emojiEmoji.push(emojiN)
                        emojiRoleMappings.set(emojiN, role.id)
                        await message.channel.send("Emoji e Cargo salvos !!\n"
                        +"`Caso queira continuar digite + grupo de emoji/cargo !!" 
                        +"`Caso queira finalizar digite !!done`")
                    }else{
                        emojiEmoji.push(emoji.id)
                        emojiRoleMappings.set(emoji.id, role.id)
                        await message.channel.send("Emoji e Cargo salvos !!\n"
                        +"`Caso queira continuar digite + grupo de emoji/cargo !!" 
                        +"`Caso queira finalizar digite !!done`")
                    }
                }
            });

            collector.on('end', async(collected, reason) => {
                let findMsgDocument = await RoleReaction.findOne({ 'messageId': idmsg.id});
                if(findMsgDocument) message.channel.send("Já existe, não foi salva");

                const roleReactionNew = new RoleReaction({
                    _id: mongoose.Types.ObjectId(),
                    guildId: message.guild.id,
                    messageId: idmsg.id,
                    emojiRoleMappings: emojiRoleMappings
                });
                roleReactionNew.save()
            })
        }  
    }catch(e){
        errorReturn(e, message, this.help.name);       
    }
}

module.exports.help = {
    name: "addreactions",
    description: "Dá cargos com reações em uma mensagem",
    usability: "Pode utilizado desta forma: `"+prefix+"addreactions #channel`\n"
    +"**Após utilizar o comando:**\n"
    +"Digite o titulo e a msg divididos por vírgula `Ex: Titulo, toda a msg`\n"
    +"Mande uma msg com emoji e cargo para cada cargo `Ex: :emoji:, @cargo`\n"
    +"Após terminar de mandar todos os emojis e cargos utilize o comando de done `!!done`\n",
    additional: "",
    others: "",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}