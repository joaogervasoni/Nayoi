const { prefix } = require("../../botconfig.json");
const {errorReturn, returnNull} = require("../../functions.js");
const { evaluate } = require('mathjs')

module.exports.run = async (bot, message, args) => {
    try{
        const calc = args.join("");
        if(returnNull(calc) || !isNaN(calc)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
        let result;
        try{
            result = evaluate(args.join(""));
        }catch{
            return message.reply("Digite uma conta valida !! :scales:");
        }
        
        return message.reply("Resultado: `"+result+"`");
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "calculator",
    description: "Faz o cálculo de valores",
    utility: "Para fazer uma conta digite `"+prefix+"calc 1+1`\n",
    others: "Para calcular um valor antes utilize () ex: `1+1/(2-1)`",
    type: "utilidade",
    aliases: ["calc"]
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}