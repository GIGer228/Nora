const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('end_chat')
        .setDescription('Ends your current conversation with Nora.')
    ,
    async execute(interaction) {
        let user = interaction.member.user;
        let conversation = interaction.client.get_conversation(user);
        if (!user.isChatting || conversation == undefined) {
            interaction.reply({ content: 'You are not even chatting with me >:(', ephemeral: true});

            let reason = user.isChatting ? '[Already chatting]' : '[No conversations created yet]';
            console.log(`Failed to end a conversation with user due to reason: ${reason}`);
            return;
        }

        let host = conversation.host;
        let userList = conversation.userList;
        let userCount = 1;

        if (user.id === host.id) {
            userList.forEach(user => user.isChatting = false);
            userCount = userList.length;
            interaction.client.conversations.shift(); //TODO: targeted deleting

            console.log(`Finished a conversation with ${userCount} user(s).`);
        } else {
            user.isChatting = false;
            conversation.remove_users([user]);

            console.log(`Removed ${userCount} user(s) from a conversation.`);
        }

        let displayNames = userList.map(user => user.displayName);
        interaction.reply(`Bye bye, see you next time, ${displayNames.join(', ')}!`);
    }
};