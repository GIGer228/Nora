const { SlashCommandBuilder } = require('discord.js');
const Conversation = require('../../conversation.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start_chat')
        .setDescription('Starts a conversation with Nora.')
        .addBooleanOption(option =>
            option
                .setName('is_private')
                .setDescription('Should the conversation be hidden from other users?')
                .setRequired(true)
        ),
    async execute(interaction) {
        let user = interaction.member.user;
        if (user.isChatting) {
            interaction.reply({ content: 'You are already chatting with me in another chat >:|', ephemeral: true});
            return;
        }

        user.isChatting = true;
        let isPrivate = interaction.options.getBoolean('is_private');
        let conversation = new Conversation([user], isPrivate);

        interaction.client.conversations.push(conversation);
        interaction.reply(`Let\'s chat about something, ${user.displayName}`);

        let flag = isPrivate ? 'private' : 'public';
        console.log(`Started a ${flag} conversation with ${user.username}.`);
    }
};