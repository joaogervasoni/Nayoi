const Discord = require("discord.js");
var request = require('request');

module.exports.run = async (bot, message, args) => {

    let args2 = args.join(" ").slice(0, 3).split(' ').join('')
    let args3 = args.join(" ").slice(3)

    if (args2 === "an") {
        
        if (!args3.split(' ').join('') != "") return message.reply(`Exemple: _f!mal an anime_`)
        else request(`https://api.jikan.moe/v3/search/anime/?q=${args3}&page=1&limit=1`, function (err, response, body) {
            if (response.statusCode != "200") return message.reply("Couldn't find, try again!")

            let rAnime = JSON.parse(body).results[0];
            if(rAnime == null) return message.reply("Couldn't find, try again!")

            let embed = new Discord.RichEmbed()
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
        })
    }
    else if (args2 === "mg"){

        if(!args3.split(' ').join('') != "") return message.reply(`Exemple: _f!mal mg manga_`)
        else request(`https://api.jikan.moe/v3/search/manga/?q=${args3}&page=1&limit=1`, function (err, response, body){
            if (response.statusCode != "200") return message.reply("Couldn't find, try again!")

            let rManga = JSON.parse(body).results[0];
            if(rManga == null) return message.reply("Couldn't find, try again!")

            let embed = new Discord.RichEmbed()
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
        })
    }
    else if (args2 === "cr"){

        if(!args3.split(' ').join('') != "") return message.reply(`Exemple: _f!mal cr character_`)
        else request(`https://api.jikan.moe/v3/search/character/?q=${args3}&page=1&limit=1`, function (err, response, body){
            if (response.statusCode != "200") return message.reply("Couldn't find, try again!")

            let rCharacter = JSON.parse(body).results[0];
            if(rCharacter == null) return message.reply("Couldn't find, try again!")

            let embed = new Discord.RichEmbed()
            .setThumbnail(rCharacter.image_url)
            .setTitle("Character")
            .setColor(bot.filoColor)
            .addField("Name:", rCharacter.name)

            return message.channel.send(embed)
        })
    }
    else if (args2 === "pf") {
        let profile = args.join(" ").slice(3)

        if (!profile.split(' ').join('') != "") return message.reply(`Exemple: f!mal pf perfil`)
        else request(`https://api.jikan.moe/v3/user/${args3}/profile`, function (err, response, body) {
            if (response.statusCode != "200") return message.reply("Couldn't find, try again!")

            let rProfile = JSON.parse(body)
            if(rProfile == null) return message.reply("Couldn't find, try again!")

            let embed = new Discord.RichEmbed()
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
        })

    } else return message.reply(`Need a mal prefix`)
}

module.exports.help = {
    name: "mal"
}