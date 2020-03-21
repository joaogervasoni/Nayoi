module.exports = (bot, message) => {
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });
}