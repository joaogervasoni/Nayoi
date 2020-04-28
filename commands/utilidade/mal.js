const {MessageEmbed} = require("discord.js");
const { prefix } = require("../../botconfig.json");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {

    let argsAdm = args.join(" ").slice(0,10).split(' ').join('')
    let args2 = args.join(" ").slice(0, 3).split(' ').join('')
    let args3 = args.join(" ").slice(3)

    if(argsAdm === "nsfwon" || argsAdm === "nsfwoff"){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Precisa de permissão");
        bot.database;
        const guild = await bot.Guild.findOne({'guildId': message.guild.id});

        if (argsAdm === "nsfwon"){
            if (guild.server.nsfw === "on") return message.channel.send(`NSFW esta atualmente: **On**`)

            guild.server.nsfw = "on";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("NSFW agora está: **On**")
            });
        }
        else if (argsAdm === "nsfwoff"){
            if (guild.nsfw === "off") return message.channel.send(`NSFW esta atualmente: **Off**`)

            guild.server.nsfw = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("NSFW agora está: **Off**")
            });
        }
    }
    else if (args2 === "an") {
        
        if (!args3.split(' ').join('') != "") return message.reply(`Exemplo: _y!mal an naruto_`)
        let rAnime = await fetch(`https://api.jikan.moe/v3/search/anime/?q=${args3}&page=1&limit=1`).then(res => res.json());

        if(rAnime.status != null){
            return message.reply("Não encontrei nenhum anime :worried:")
        } 
        if(rAnime === null) return message.reply("Parece que aconteceu um bug em meu sistema :bug: (Erro: Json sem dados)")
        
        rAnime = rAnime.results[0];

        bot.database;
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            if(rAnime.rated == "Rx" && guild.nsfw == "off") return message.reply("Animes com Rated 'Rx' estão desabilitados _**Safradinho**_ :banana:")
            let embed = new MessageEmbed()
                .setThumbnail(rAnime.image_url)
                .setTitle("Anime")
                .setDescription(rAnime.synopsis)
                .setColor(bot.filoColor)
                .addField("Name:", rAnime.title)
                .addField("Score:", rAnime.score, true)
                .addField("Rated:", rAnime.rated, true)
                .addField("Type:", rAnime.type, true)
                .addField("Episodes:", rAnime.episodes, true)
            return message.channel.send(embed)
        });
    }
    else if (args2 === "mg"){

        if(!args3.split(' ').join('') != "") return message.reply(`Exemplo: _y!mal mg naruto_`)

        let rManga = await fetch(`https://api.jikan.moe/v3/search/manga/?q=${args3}&page=1&limit=1`).then(res => res.json());
        if(rManga.status != null){
            return rManga.reply("Não encontrei nenhum manga :worried:")
        } 
        if(rManga === null) return message.reply("Parece que aconteceu um bug em meu sistema :bug: (Erro: Json sem dados)")
        
        rManga = rManga.results[0];
        bot.database;
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
            if(rManga.rated == "Rx" && guild.nsfw == "off") return message.reply("Mangas com Rated 'Rx' estão desabilitados _**Safradinho**_ :banana:")
            let embed = new MessageEmbed()
            .setThumbnail(rManga.image_url)
            .setTitle("Manga")
            .setDescription(rManga.synopsis)
            .setColor(bot.filoColor)
            .addField("Name:", rManga.title)
            .addField("Score:", rManga.score, true)
            .addField("Rated:", rManga.rated, true)
            .addField("Type:", rManga.type, true)
            .addField("Volumes:", rManga.volumes, true)
            return message.channel.send(embed)
        });
    }
    else if (args2 === "ch"){

        if(!args3.split(' ').join('') != "") return message.reply(`Exemplo: _y!mal ch itachi_`)
        let rCharacter = await fetch(`https://api.jikan.moe/v3/search/character/?q=${args3}&page=1&limit=1`).then(res => res.json());
        if(rCharacter.status != null){
            return message.reply("Não encontrei nenhum personagem :worried:")
        } 
        if(rCharacter === null) return message.reply("Parece que aconteceu um bug em meu sistema :bug: (Erro: Json sem dados)")
        
        rCharacter = rCharacter.results[0];

        let embed = new MessageEmbed()
        .setThumbnail(rCharacter.image_url)
        .setTitle("Character")
        .setColor(bot.filoColor)
        .addField("Name:", rCharacter.name)
        return message.channel.send(embed)

    }
    else if (args2 === "pf") {
        let profile = args.join(" ").slice(3)

        if (!profile.split(' ').join('') != "") return message.reply(`Exemplo: y!mal pf perfil`)
        let rProfile = await fetch(`https://api.jikan.moe/v3/user/${args3}/profile`).then(res => res.json());
        if(rProfile.status != null){
            return message.reply("Não encontrei nenhum perfil :worried:")
        } 
        if(rProfile === null) return message.reply("Parece que aconteceu um bug em meu sistema :bug: (Erro: Json sem dados)")

        let embed = new MessageEmbed()
            .setThumbnail(rProfile.image_url)
            .setTitle(rProfile.username)
            .setColor(bot.filoColor)
            .addField("Gender:", rProfile.gender, true)
            .addField("Location:", rProfile.location, true)
            .addField(`Animes: ${rProfile.anime_stats.total_entries}`, `Watching: ${rProfile.anime_stats.watching} | Completed: ${rProfile.anime_stats.completed} | On hold: ${rProfile.anime_stats.on_hold}
                    Dropped: ${rProfile.anime_stats.dropped} | Plan to Watch: ${rProfile.anime_stats.plan_to_watch}`)
            .addField(`Mangas: ${rProfile.manga_stats.total_entries}`, `Reading: ${rProfile.manga_stats.reading} | Completed: ${rProfile.manga_stats.completed} | On hold: ${rProfile.manga_stats.on_hold}
                    Dropped: ${rProfile.manga_stats.dropped} | Plan to Read: ${rProfile.manga_stats.plan_to_read}`)
            .addField("Joined:", rProfile.joined)
        return message.channel.send(embed)

    } else return message.reply(`Preciso de um prefixo _(Exemplo: an,mg,ch,pf)_`)
}

module.exports.help = {
    name: "mal",
    description: "Puxa informações do MAL ( My Anime List )",
    usability: "Pode se pesquisar um anime facilmente `"+prefix+"mal an naruto`\n"
    +"Também podemos retornar mangás e outras informações `"+prefix+"mal mg naruto`\n"
    +"**Após o mal podem ser utilizadas as seguintes informações:**\n"
    +"`ch` - Para encontrar um personagem\n"
    +"`pf` - Para encontrar um perfil no MAL\n",
    additional: "`"+prefix+"mal nfswon` - Faz pesquisas +18 (padrão)\n"
    +"`"+prefix+"mal nfswoff` - Desabilita pesquisar +18",
    others: "",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}