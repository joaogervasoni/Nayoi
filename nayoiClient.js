const { Client, Collection } = require("discord.js");
const Langs = require('./structures/langs.js');
const Database = require('./structures/database.js');
const Error = require('./utils/error.js');

/** 
* @extends Discord.Client
*/
class NayoiClient extends Client {
    /**
    * @param {Object} options The options passed to the NayoiClient
    * @param {Object} options.clientOptions Client options used by discord.js Client
    * @param {Object} options.config Config filepath 
    */
    constructor(options) {
        super(options.clientOptions || {});

        options.config.prefix ? this.prefix = options.config.prefix : this.prefix = "n!";
        options.config.color ? this.baseColor = options.config.color : this.baseColor = "#ff8ff2";
        options.config.apis ? this.apis = options.config.apis : this.apis = {weatherApi: "", tenorApi: "", twitchID: ""};

        this.database = new Database(options.config.mongodb);
        this.langs = new Langs();
        this.error = new Error(true);
        
        this.snipes = new Map();
        this.commands = new Collection();
        this.aliases = new Collection();
        this.lists = new Collection();

        const commands = require("./structures/command");
        commands.run(this);

        const events = require("./structures/event");
        events.run(this);

        const lists = require("./structures/list");
        lists.run(this);
    }

    /**
    * @param {String} token Discord token 
    */
    login(token) {
        super.login(token);
        return this;
    }
}

module.exports = NayoiClient;