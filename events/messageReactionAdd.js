module.exports = async (bot, reaction, user) => { 
    if(user.bot == true) return

    try{
        if(reaction.message) {
            await reaction.message.fetch();
            let { id } = reaction.message;

            let roleReaction = await bot.database.findOne("rolereaction", { messageId: id });
            if(roleReaction) {
                let { emojiRoleMappings } = roleReaction;
                let roleId;

                if(emojiRoleMappings.get(reaction.emoji.id)) roleId = emojiRoleMappings.get(reaction.emoji.id);   
                else if (emojiRoleMappings.get(reaction.emoji.name)) roleId = emojiRoleMappings.get(reaction.emoji.name);
                else return;
                
                let role = reaction.message.guild.roles.cache.get(roleId);
                let member = reaction.message.guild.members.cache.get(user.id);
                
                if(role && member) await member.roles.add(role);
                return;
            }
        }
    }catch(e){
        bot.error.errorReturn(e, null, "messageReactionAdd");
    }
}