module.exports = {
    langReturn: async function(guildLang, name, type) {
        let langs = guildLang;
        let langCommand = null;

        if(!type || !name || !langs) return langCommand;
        if(type === "cmd"){
            lang1 = langs.commands.find(element => element.name === name).cmd;
            lang2 = langs.commands.find(element => element.name === "geral").cmd;
            langCommand = await Object.assign({}, lang1, lang2);
        } 
        if(type === "event") langCommand = langs.events.find(element => element.name === name).cmd;

        return langCommand;
    },

    langParams: function(str, prefix, command){
        for (const key in str) {
            if (str.hasOwnProperty(key)) {
                str[key] = str[key].replace(/{prefix}/g, prefix);
                str[key] = str[key].replace(/{cmdName}/g, command);
            }
        }
    }
}