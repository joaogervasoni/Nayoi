const { MessageEmbed } = require("discord.js");
const { errorReturn } = require("../../utils/functions.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args, lang) => {
    try{
        const cmd = args[0];
        let subcmd = null;
        if(cmd != null) {subcmd = args.join("").slice(cmd.length)}
        if(subcmd === null || subcmd === "" || subcmd === undefined) return message.reply(lang.helpReturn);

        if (cmd === "an" || cmd === "anime") {
            
            let anime = await fetch(`https://api.jikan.moe/v3/search/anime/?q=${subcmd}&page=1&limit=1`).then(res => res.json());
            if(anime.status != null || anime === null || anime.results[0] === undefined) return message.reply(lang.resultNull)

            anime = anime.results[0];
            let embed = new MessageEmbed()
                .setThumbnail(anime.image_url)
                .setTitle("Anime")
                .setDescription(anime.synopsis)
                .setColor(bot.baseColor)
                .addField(lang.fieldName, anime.title, true)
                .addField(lang.fieldScore, anime.score, true)
                .addField(lang.fieldRated, anime.rated, true)
                .addField(lang.fieldType, anime.type, true)
                .addField("Airing:", anime.airing, true)
                .addField("Episódios:", anime.episodes, true)
            return message.channel.send(embed)
        }
        else if (cmd === "mg" || cmd === "manga"){

            let manga = await fetch(`https://api.jikan.moe/v3/search/manga/?q=${subcmd}&page=1&limit=1`).then(res => res.json());
            if(manga.status != null || manga === null || manga.results[0] === undefined) return message.reply(lang.resultNull)
            
            manga = manga.results[0];
            let embed = new MessageEmbed()
            .setThumbnail(manga.image_url)
            .setTitle("Manga")
            .setDescription(manga.synopsis)
            .setColor(bot.baseColor)
            .addField(lang.fieldName, manga.title, true)
            .addField(lang.fieldScore, manga.score, true)
            .addField(lang.fieldType, manga.type, true)
            .addField(lang.fieldVol, manga.volumes, true)
            if(manga.rated != null) embed.addField(lang.fieldRated, manga.rated, true)
            return message.channel.send(embed)
        }
        else if (cmd === "ch" || cmd === "character"){

            let character = await fetch(`https://api.jikan.moe/v3/search/character/?q=${subcmd}&page=1&limit=1`).then(res => res.json());
            if(character.status != null || character === null || character.results[0] === undefined) return message.reply(lang.resultNull)

            character = character.results[0];
            let embed = new MessageEmbed()
            .setThumbnail(character.image_url)
            .setTitle(lang.titleCharacter)
            .setColor(bot.baseColor)
            .addField(lang.fieldName, character.name)
            return message.channel.send(embed)
        }
        else if (cmd === "pf" || cmd === "perfil") {

            let profile = await fetch(`https://api.jikan.moe/v3/user/${subcmd}/profile`).then(res => res.json());
            if(profile.status != null || profile === null || profile.status === "400" )return message.reply(lang.resultNull)

            let embed = new MessageEmbed()
                .setThumbnail(profile.image_url)
                .setTitle(profile.username)
                .setColor(bot.baseColor)
                .addField("Gênero:", profile.gender, true)
                .addField("Local:", profile.location, true)
                .addField(`Animes: ${profile.anime_stats.total_entries}`, `Assistindo: ${profile.anime_stats.watching} | Completos: ${profile.anime_stats.completed} | Em mãos: ${profile.anime_stats.on_hold}
                        Dropados: ${profile.anime_stats.dropped} | Para ver: ${profile.anime_stats.plan_to_watch}`)
                .addField(`Mangas: ${profile.manga_stats.total_entries}`, `Lendo: ${profile.manga_stats.reading} | Completos: ${profile.manga_stats.completed} | Em mãos: ${profile.manga_stats.on_hold}
                        Dropados: ${profile.manga_stats.dropped} | Para ler: ${profile.manga_stats.plan_to_read}`)
                .addField("Entrou em:", profile.joined)
            return message.channel.send(embed)

        }else return message.reply(lang.helpReturn)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "mal",
    type: "utilidade"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false
}