const config = require('./botconfig.json');
const dotenv = require('dotenv').config();
const NayoiClient = require('./src/nayoiClient');

const bot = new NayoiClient(options = {
    clientOptions: {
        disableMentions: 'everyone',
        partials: ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION']
    },
    config: config
});

bot.login(process.env.TOKEN);