const config = require("./botconfig.json");
const NayoiClient = require("./nayoiClient.js");

const bot = new NayoiClient(options = {
    clientOption: {
        disableMentions: "everyone",
        ws: { intents: ['GUILD_PRESENCES', 'GUILD_MEMBERS'] }
    },
    config: config
});

bot.login(config.token);