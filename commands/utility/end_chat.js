const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('end_chat')
        .setDescription('Ends your current conversation with Nora.')
    ,
    async execute(interaction) {
        var member = interaction.member.user;
        var conversation = interaction.client.conversations[0];
        var host = conversation.host;

        var memberCount = 1;

        if (member.id === host.id) {
            memberCount = conversation.userList.length;
            interaction.client.conversations.shift(); //TODO: targeted deleting
        } else {
            conversation.remove_users([member]);
        }

        interaction.reply('Bye bye, see you next time!');

        console.log(`Finished a conversation with ${memberCount} users.`);
    }
};