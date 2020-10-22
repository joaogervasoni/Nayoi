const config = require("./botconfig.json");
const NayoiClient = require("./nayoiClient.js");

const bot = new NayoiClient(options = {
    clientOption: {disableMentions: "everyone"},
    config: config
});

bot.login(config.token);