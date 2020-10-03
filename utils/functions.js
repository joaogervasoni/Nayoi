var colors = require('colors');

module.exports = {
    returnNull: function(text){
        if(Array.isArray(text)){
            if(text.length === 0) return true;
        } 
        if(!text || text === null || text === undefined) return true;
        else return false;
    },
    
	limitLength: function(text, limit){
        limit = limit.toLowerCase();

        if(limit === "title") limit = 256;
        else if(limit === "field") limit = 1024;
        else return;

        if(text.length > limit){
            text = text.substring(0, (limit-3));
            text = `${text}...`;
            return text
        } 
        else return text
    },

	randomCollection: function(collection, name){
        let random = collection.get(name);
        if(!Array.isArray(random)){
            let keys = Object.keys(random);
            let randomIndex = keys[Math.floor(Math.random() * keys.length)]
            random = random[randomIndex];
            return random;
        } 
        random = random[Math.floor(Math.random() * random.length)]
        return random;
    },

    listCollection: function(collection, name){
        let list = collection.get(name);
        return list;
    },

    formatDate: function(date) {
        /*const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };*/
        let newDate = new Intl.DateTimeFormat('en-GB').format(date);
        return newDate;
    },

    formatText: function(text){
        text = text.normalize('NFD').replace(/([\u0300-\u036f])/g, '');
        text = text.replace(/([^0-9a-zA-Z])/g, ' ');
        return text;
    },

    formatEmojiId: function(idText){
        idText = idText.substring(idText.indexOf(":") + 1);
        idText = idText.substring(idText.indexOf(":") + 1).slice(0,18);
        return idText;
    },

    upperCaseFirst: function(text){
        text = text.charAt(0).toUpperCase() + text.slice(1);
        return text;
    },

    formatId: function(idText){
        if(module.exports.returnNull(idText)) return idText
        idText = idText.replace(/\D+/g, '');
        return idText;
    },

    mentionById: function(id){
        user = `<@!${id}>`
        return user;
    },

    formatFileName: function(__filename){
        let filename = __filename.replace(/^.*[\\\/]/, '');
        filename = filename.substring(0, (filename.length-3));
        return filename;
    }
}