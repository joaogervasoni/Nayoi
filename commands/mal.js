const Discord = require("discord.js");
var request = require('request');
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports.run = async (bot, message, args) => {

    let argsAdm = args.join(" ").slice(0,10).split(' ').join('')
    let args2 = args.join(" ").slice(0, 3).split(' ').join('')
    let args3 = args.join(" ").slice(3)

    if (argsAdm === "nsfwon"){

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Precisa de permissão");
        mongoose.connect(`${bot.mongodb}`);
    
        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.nsfw === "on") return message.channel.send(`NSFW esta atualmente: **On**`)
            
            console.log(guild.nsfw)
            guild.nsfw = "on";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("NSFW agora está: **On**")
            });
        });
    }
    else if (argsAdm === "nsfwoff"){

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Precisa de permissão");
        mongoose.connect(`${bot.mongodb}`);

        bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {

            if (guild.nsfw === "off") return message.channel.send(`NSFW esta atualmente: **Off**`)
            
            console.log(guild.nsfw)
            guild.nsfw = "off";
            guild.save(function (err){
                if(err) return message.channel.send(`Erro: ${err}, contate o suporte`)
                if(!err) return message.channel.send("NSFW agora está: **Off**")
            });
        });
    }
    else if (args2 === "an") {
        
        if (!args3.split(' ').join('') != "") return message.reply(`Exemplo: _y!mal an naruto_`)
        else request(`https://api.jikan.moe/v3/search/anime/?q=${args3}&page=1&limit=1`, function (err, response, body) {
            if (response.statusCode != "200") return message.reply("Não encontrei o anime _(Exemplo: y!mal an naruto)_")

            let rAnime = JSON.parse(body).results[0];
            if(rAnime == null) return message.reply("Parece que aconteceu um bug em meu sistema (Erro: Json sem dados)")

            mongoose.connect(`${bot.mongodb}`);

            bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
                if(rAnime.rated == "Rx" && guild.nsfw == "off") return message.reply("Animes com Rated 'Rx' estão desabilitados _**Safradinho**_ :banana:")

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
            });
        })
    }
    else if (args2 === "mg"){

        if(!args3.split(' ').join('') != "") return message.reply(`Exemplo: _y!mal mg naruto_`)
        else request(`https://api.jikan.moe/v3/search/manga/?q=${args3}&page=1&limit=1`, function (err, response, body){
            if (response.statusCode != "200") return message.reply("Não encontrei o manga _(Exemplo: y!mal mg naruto)_")

            let rManga = JSON.parse(body).results[0];
            if(rManga == null) return message.reply("Parece que aconteceu um bug em meu sistema (Erro: Json sem dados)")

            mongoose.connect(`${bot.mongodb}`);

            bot.Guild.findOne({'guildId': message.guild.id}, (err, guild) => {
                if(rAnime.rated == "Rx" && guild.nsfw == "off") return message.reply("Mangas com Rated 'Rx' estão desabilitados _**Safradinho**_ :banana:")

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
            });
        })
    }
    else if (args2 === "ch"){

        if(!args3.split(' ').join('') != "") return message.reply(`Exemplo: _y!mal ch itachi_`)
        else request(`https://api.jikan.moe/v3/search/character/?q=${args3}&page=1&limit=1`, function (err, response, body){
            if (response.statusCode != "200") return message.reply("Não encontrei o personagem _(Exemplo: y!mal ch itachi)_")

            let rCharacter = JSON.parse(body).results[0];
            if(rCharacter == null) return message.reply("Parece que aconteceu um bug em meu sistema (Erro: Json sem dados)")

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

        if (!profile.split(' ').join('') != "") return message.reply(`Exemplo: y!mal pf perfil`)
        else request(`https://api.jikan.moe/v3/user/${args3}/profile`, function (err, response, body) {
            if (response.statusCode != "200") return message.reply("Não encontrei o perfil _(Exemplo: y!mal pf perfil)_")

            let rProfile = JSON.parse(body)
            if(rProfile == null) return message.reply("Parece que aconteceu um bug em meu sistema (Erro: Json sem dados)")

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

    } else return message.reply(`Preciso de um prefixo _(Exemplo: an,mg,ch,pf)_`)
}

module.exports.help = {
    name: "mal"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}