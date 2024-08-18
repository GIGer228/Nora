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
        var user = interaction.member.user;
        if (user.isChatting) {
            interaction.reply('You are already chatting with me in another chat >:|');
            return;
        }

        var userList = [user];
        var additionalUser = interaction.options.getUser('additional_user');
        if (additionalUser != null) {
            if (!additionalUser.isChatting) userList.push(additionalUser);
            else interaction.reply(`Your mate ${additionalUser.username} 
                                    seems to already chatting with me elsewhere.
                                    Try again later :)`);
        }

        userList.forEach(user => user.isChatting = true);
        var conversation = new Conversation(userList);

        interaction.client.conversations.push(conversation);
        interaction.reply('So, let\'s chat about something.');

        console.log(`Started a conversation with ${userList.length} users.`);
    }
};