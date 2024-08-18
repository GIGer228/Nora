const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('end_chat')
        .setDescription('Ends your current conversation with Nora.')
    ,
    async execute(interaction) {
        var user = interaction.member.user;
        var conversation = interaction.client.conversations[0];
        if (!user.isChatting || conversation == undefined) {
            interaction.reply('You are not even chatting with me >:(');

            let reason = '[Already chatting]' ? user.isChatting : '[No conversations created yet]';
            console.log(`Failed to end a conversation with user due to reason: ${reason}`);
            return;
        }

        var host = conversation.host;
        var userList = conversation.userList;
        var userCount = 1;

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

        interaction.reply('Bye bye, see you next time!');
    }
};