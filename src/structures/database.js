const mongoose = require('mongoose');
const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "../../", "models");
const { Collection } = require("discord.js");

class Database {
    #options
    constructor(client, mongodb){
        this.bot = client;
        this.models = new Collection();
        this.#options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }       
        
        this.loadModels();
        this.databaseConnection(mongodb);
    }

    databaseConnection(mongodb){
        mongoose.connect(mongodb, this.#options)
        .catch(error => console.error(this.bot.logger.info(`erro de conexão inicial: \n${error.stack}`, 'database')));
        
        mongoose.connection.on('connected', () => {
            this.bot.logger.info('conexão com db estabelecida', 'database');
        });

        mongoose.connection.on('error', err => {
           this.bot.logger.error(`erro de conexão \n${err.stack}`, 'database');
        });

        mongoose.connection.on('disconnected', () => {
            this.bot.logger.warn('conexão com db perdida', 'database');
        });
    }

    loadModels(){
        for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".js"))){
            const prop = require(`${filePath}/${cmd}`);
            this.models.set(prop.modelName.toLowerCase(), prop);
        }
        
        this.bot.logger.info(`${this.models.size} models carregados`, 'database');
    }

    check(obj){
        if(obj.length === 0) return null;
        else return obj;
    }

    async save(model){
        try{
            await model.save();
            return
        }catch(e){
            return new Error(e.stack);
        }
    }

    async getModel(name){
        let model = this.models.get(name.toLowerCase());
        return model;
    }

    async create(modelName, options){
        let model = this.getModel(modelName);
        
        model = await model.then(result => {
            const Model = result;
            const newModel = new Model(options);
            return newModel;
        })

        return model;
    }
    
    async findOne(modelName, options){
        try{
            let model = await this.getModel(modelName);
            model = await model.findOne(options);
            return model;
        }catch(e){
            return new Error(e.stack);
        }
    }

    async find(modelName, options){
        try{
            let model = await this.getModel(modelName);
            model = await model.find(options);
            return this.check(model);
        }catch(e){
            return new Error(e.stack);
        }
    }

    async findOneAndRemove(modelName, options){
        try{
            let model = await this.getModel(modelName);
            model = await model.findOneAndRemove(options);
            return model;
        }catch(e){
            return new Error(e.stack);
        }
    }

    async deleteMany(modelName, options){
        try{
            let model = await this.getModel(modelName);
            model = await model.deleteMany(options);
            return model;
        }catch(e){
            return new Error(e.stack);
        }
    }

    async findOneAndDelete(modelName, options){
        try{
            let model = await this.getModel(modelName);
            model = await model.findOneAndDelete(options);
            return model;
        }catch(e){
            return new Error(e.stack);
        }
    }
}

module.exports = Database;