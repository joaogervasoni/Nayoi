const { errorReturn, formatChannelId, returnNull } = require("../../utils/functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    try{
        const cmd = args[0];
        let subcmd = args[1];
        
        if(returnNull(cmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
        
        if (cmd === "on" || cmd === "true"){
            if(returnNull(subcmd)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
            let channel = formatChannelId(subcmd);
            let chat = message.guild.channels.cache.find(chat => channel, `id` );
            if (!chat || chat === undefined || chat === null) return message.reply(`Não encontrei nenhum canal :crying_cat_face:`);

            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.welcome.status === "on") return message.channel.send("Bem-vindo já esta `"+guild.welcome.status+"`");
            
            guild.welcome.status = "on";
            guild.welcome.channel = channel;
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Bem-vindo agora esta `"+guild.welcome.status+"` :sunglasses:");
            });
        }
        else if (cmd === "off" || cmd === "false"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            if (guild.welcome.status === "off") return message.channel.send("Bem-vindo já esta `"+guild.welcome.status+"`");
        
            guild.welcome.status = "off";
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Bem-vindo agora esta `"+guild.welcome.status+"` :cry:");
            });
        }
        else if(cmd === "msg" || cmd === "message"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            guild.welcome.msg = args.join(" ").slice(cmd.length)
            guild.save(function (err){
                if(err) return errorReturn(err, message, this.help.name);
                if(!err) return message.channel.send("Mensagem de Bem-vindo modificada :face_with_monocle:!!")
            });
        }
        else if(cmd === "ch" || cmd === "channel"){
            let channel = formatChannelId(subcmd);
            let chat = message.guild.channels.cache.find(chat => channel, `id` );
            if (returnNull(chat)) return message.reply(`Não encontrei nenhum canal :crying_cat_face:`);

            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            guild.welcome.channel = channel;
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("Canal trocado :face_with_monocle:!!")
            })
        }
        else if(cmd === "sh" || cmd === "show"){
            const guild = await bot.Guild.findOne({'guildId': message.guild.id});
            return message.channel.send("`Mensagem atual é:` "+guild.welcome.msg)
        }
        else return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`")
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "welcome",
    description: "Gerencia toda a parte de Bem-Vindo do servidor",
    usability: "Pode ser ativo utilizando `"+prefix+"welcome on #chat`\n"
    +"A mesagem pode ser alterada utilizando `"+prefix+"welcome msg mensagem-aqui`\n"
    +"**Dentro da msg podem ser utilizadas as seguintes informações:**\n"
    +"`{member}` - Para a pessoa ser marcada\n"
    +"`{membercount}` - Para monstrar o número de pessoas no servidor\n",
    additional: "`"+prefix+"welcome off` - Para desabilitar o comando\n"
    +"`"+prefix+"welcome ch #chat` - Altera o canal do bem-vindo\n"
    +"`"+prefix+"welcome sh` - Exibe msg de bem-vindo\n",
    others: "Caso queira utilizar banners no bem-vindo utilize o comando `"+prefix+"banner`",
    type: "automation"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}