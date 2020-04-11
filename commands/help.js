const {MessageEmbed} = require("discord.js");

module.exports.run = (bot, message, args) => {

    let cmd = args.join(" ").slice(0).toLowerCase();
    let embed = new MessageEmbed()

    if(cmd === "welcome"){
        embed
        .setTitle("Welcome:")
        .setDescription("Gerencia toda a parte de Bem-Vindo do servidor")
        .addField("Usabilidade", "Pode ser ativo utilizando `"+bot.prefix+"welcome on #chat`\n"
        +"A mesagem pode ser alterada utilizando `"+bot.prefix+"welcome msg mensagem-aqui`\n"
        +"**Dentro da msg podem ser utilizadas as seguintes informações:**\n"
        +"`{member}` - Para a pessoa ser marcada\n"
        +"`{membercount}` - Para monstrar o número de pessoas no servidor\n")
        .addField("Comandos adicionais","`"+bot.prefix+"welcome ch #chat` - Altera o canal do bem-vindo\n"
        +"`"+bot.prefix+"welcome sh` - Exibe msg de bem-vindo\n"
        +"`"+bot.prefix+"welcome cv` - Ativa o banner de bem-vindo\n")
        return message.channel.send(embed)
    }
    else if(cmd === "tempo"){
        embed
        .setTitle("Temperatura:")
        .setDescription("Traz a temperatura atual do local requisitado")
        .addField("Usabilidade", "Pode ser utilizado de maneira simples `"+bot.prefix+"tempo local`\n")
        .addField("Observações", "A utilização de acentos ou 'ç' na pesquisa pode não retornar dados")
        return message.channel.send(embed)
    }
    else if(cmd === "snipe"){
        embed
        .setTitle("Snipe:")
        .setDescription("Traz a ultima msg deletada do canal")
        .addField("Usabilidade", "Pode ser utilizado de maneira simples `"+bot.prefix+"snipe`\n")
        .addField("Observações", "A msg retornada é referente ao canal onde foi utilizado o comando")
        return message.channel.send(embed)
    }
    else if(cmd === "mal"){
        embed
        .setTitle("My Anime List (Mal):")
        .setDescription("Puxa informações do MAL")
        .addField("Usabilidade", "Pode se pesquisar um anime facilmente `"+bot.prefix+"mal an naruto`\n"
        +"Também podemos retornar mangás e outras informações `"+bot.prefix+"mal mg naruto`\n"
        +"**Após o mal podem ser utilizadas as seguintes informações:**\n"
        +"`ch` - Para encontrar um personagem\n"
        +"`pf` - Para encontrar um perfil no MAL\n")
        .addField("Comandos adicionais","`"+bot.prefix+"mal nfswon` - Faz pesquisas +18 (padrão)\n"
        +"`"+bot.prefix+"mal nfswoff` - Desabilita pesquisar +18")
        return message.channel.send(embed)
    }
    else if(cmd === "log"){
        embed
        .setTitle("Log:")
        .setDescription("Gerencia toda a parte de Logs do servidor mostrando pessoas que sairam, msgs deletadas/editadas e nick alterados")
        .addField("Usabilidade", "Pode ser ativo utilizando `"+bot.prefix+"log on #chat`\n"
        +"O canal pode ser alterado utilizando `"+bot.prefix+"log ch #chat`\n")
        .addField("Comandos adicionais","`"+bot.prefix+"log off` - Desabilita o sistema de log")
        return message.channel.send(embed)
    }
    else if(cmd === "autorole"){
        embed
        .setTitle("Role automática:")
        .setDescription("Gerencia autorole do servidor dando cargo automáticamente para quem entra")
        .addField("Usabilidade", "Pode ser ativo utilizando `"+bot.prefix+"autorole on @cargo`\n"
        +"A role pode ser alterada utilizando `"+bot.prefix+"autorole rol @cargo`\n")
        .addField("Comandos adicionais","`"+bot.prefix+"autorole off` - Desabilita o autorole\n")
        return message.channel.send(embed)
    }
    else if(cmd === "say" || cmd === "sayembed"){
        embed
        .setTitle("Say e Sayembed:")
        .setDescription("Manda uma msg pelo Bot")
        .addField("Usabilidade", "Pode ser utilizando usando `"+bot.prefix+"say msgaqui`\n"
        +"Também pode ser mandando em um chat diferente usando`"+bot.prefix+"say #channel msgaqui`\n"
        +"**Os comandos say e sayembed utilizam os mesmos parâmetros**\n")
        return message.channel.send(embed)
    }
    else if(cmd === "addreactions"){
        embed
        .setTitle("Role Reaction:")
        .setDescription("Dá cargos com reações em uma mensagem")
        .addField("Usabilidade", "Pode utilizado desta forma: `"+bot.prefix+"addreactions messageid`\n"
        +"Caso a mensagem esteja em outro canal utilize `"+bot.prefix+"addreactions messageid #channel`\n"
        +"**Após utilizar o comando:**\n"
        +"`emoji, cargo` - Mande uma msg com emoji e cargo para cada cargo\n"
        +"`!!done` - Após terminar utilize o comando de done\n")
        return message.channel.send(embed)
    }

}

module.exports.help = {
    name: "help"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}