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
        let displayNames, userCount;

        function finish_conversation() {
            userList.forEach(user => user.isChatting = false);
            displayNames = userList.map(user => user.displayName);
            userCount = userList.length;
            
            interaction.client.conversations = interaction.client.conversations
                                                .filter(c => c != conversation);

            console.log(`Finished a conversation with ${userCount} user(s).` + 
                        ` Host: ${host.username}`
            );
        }

        function exclude_member() {
            user.isChatting = false;
            displayNames = [user.displayName];
            userCount = 1;

            conversation.remove_users([user]);

            console.log(`Removed ${user.username} from a conversation.` +
                        ` Host: ${host}`
            );
        }

        if (user.id === host.id) finish_conversation();
        else exclude_member();

        interaction.reply(`Bye bye, see you next time, ${displayNames.join(', ')}!`);
    }
};