const { SlashCommandBuilder } = require('discord.js');
const Conversation = require('../../conversation.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start_chat')
        .setDescription('Starts a conversation with Nora.')
        .addUserOption(option =>
            option
                .setName('additional_user')
                .setDescription('Who else should join the conversation?')
        ),
    async execute(interaction) {
        var userList = [interaction.member.user];
        var additionalUser = interaction.options.getUser('additional_user');
        if (additionalUser != null) {
            userList.push(additionalUser);
        }

        var conversation = new Conversation(userList);

        interaction.client.conversations.push(conversation);
        interaction.reply('So, let\'s chat about something.');

        console.log(`Started a conversation with ${userList.length} users.`);
    }
};