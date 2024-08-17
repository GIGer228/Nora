const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('end_chat')
        .setDescription('Ends your current conversation with Nora.')
    ,
    async execute(interaction) {
        var memberId = interaction.member.user.id;
        var conversation = interaction.client.conversations[0];
        var hostId = conversation.hostId;

        var memberCount = 1;

        if (memberId === hostId) {
            memberCount = conversation.userIdList.length;
            interaction.client.conversations.shift(); //TODO: targeted deleting
        } else {
            conversation.remove_users([memberId]);
        }

        interaction.reply('Bye bye, see you next time!');

        console.log(`Finished a conversation with ${memberCount} users.`);
    }
};