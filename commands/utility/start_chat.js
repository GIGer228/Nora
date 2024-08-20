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
        var user = interaction.member.user;
        if (user.isChatting) {
            interaction.reply({ content: 'You are already chatting with me in another chat >:|', ephemeral: true});
            return;
        }

        user.isChatting = true;
        var conversation = new Conversation([user]);
        conversation.isPrivate = interaction.options.getBoolean('is_private');

        interaction.client.conversations.push(conversation);
        interaction.reply(`Let\'s chat about something, ${user.displayName}`);

        let flag = conversation.isPrivate ? 'private' : 'public';
        console.log(`Started a ${flag} conversation with ${user.username}.`);
    }
};