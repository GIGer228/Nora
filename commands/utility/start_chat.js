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
            interaction.reply('You are already chatting with me in another chat >:|');
            return;
        }

        // #region 
        // TODO: Put this part in adding function
        // var userList = [user];
        // var additionalUser = interaction.options.getUser('additional_user');
        // if (additionalUser != null) {
        //     if (!additionalUser.isChatting) userList.push(additionalUser);
        //     else interaction.reply(`Your mate ${additionalUser.username} 
        //                             seems to already chatting with me elsewhere.
        //                             Try again later :)`);
        // }
        // #endregion

        user.isChatting = true;
        var conversation = new Conversation([user]);
        conversation.isPrivate = interaction.options.getBoolean('is_private');

        interaction.client.conversations.push(conversation);
        interaction.reply('So, let\'s chat about something.');

        let flag = conversation.isPrivate ? 'private' : 'public';
        console.log(`Started a ${flag} conversation with ${user.username}.`);
    }
};