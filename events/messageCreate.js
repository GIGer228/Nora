const path = require('node:path');
const { Events } = require('discord.js');
const configPath = path.resolve('config.json')
const { clientId } = require(configPath);

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const channel = message.channel;
        const author = message.author;
        const content = message.content;

        if (author.id == clientId) return;
        
        const mentions = message.mentions;
        const conversation = message.client.get_conversation(author);

        if (conversation == undefined) {
            message.reply('You have to start a conversation with \`/start_chat\` first.');
            return;
        }

        function add_members(list) {
            list = list.filter(user => 
                !conversation.userList.includes(user) && !user.isChatting);

            if (list.length == 0) {
                message.reply('I can\'t add your buddies because they' + 
                            ' either already in this or in some other chat \`(* ￣︿￣)\`');
                console.log('[Fail]\nFailed to add members to the conversation');
                return;
            }

            conversation.add_users(list);
            list.forEach(user => user.isChatting = true);

            let salutation = list.length == 1 ? ['friend', 'there'] : ['friends', 'everyone'];
            message.reply(`Oke, let\'s chat together with your ` +
                        `${salutation[0]} ${list.map(user => user.displayName).join(' and ')}. ` +
                        `\nHi ${salutation[1]} \`ヾ(^▽^*)))\``);

            console.log(`Added following ${list.length > 1 ? 'user' : 'users'} to the conversation:`);
            console.log(list.join(', '));
        }

        function remove_members(list) {
            list = list.filter(user => 
                conversation.userList.includes(user));

            if (list.length == 0) {
                message.reply('I can\'t exclude persons from this ' + 
                            'chat, if they are not already here \`(* ￣︿￣)\`');
                console.log('[Fail]\nFailed to remove members from the conversation');
                return;
            }

            conversation.remove_users(list);
            list.forEach(user => user.isChatting = false);

            let salutation = list.length == 1 ? ['friend', 'buddy'] : ['friends', 'everyone'];
            message.reply(`Oke, let\'s say bye-bye to your ` +
                        `${salutation[0]} ${list.map(user => user.displayName).join(' and ')}. ` +
                        `\nBye-byee ${salutation[1]} \`(*^-^*)/\``);

            console.log(`Removed following ${list.length > 1 ? 'user' : 'users'} from the conversation:`);
            console.log(list.join(', '));
        }
        
        if (mentions.parsedUsers.some(user => user.id == clientId)){
            let search = content.toLowerCase();
            let addRequest = search.includes('add');
            let removeRequest = search.includes('remove');
            if (!(addRequest || removeRequest)) {
                channel.send('Ping me only if you wanna \`add/remove\` some users to/from the conversation!');
                return;
            };

            let list = mentions.parsedUsers.map(user => user);
            // Getting rid of client's mentions
            list = list.filter(user => user.id != clientId);

            if (list.length == 0) {
                message.reply('You forgot to list members to add or remove -_-');
            } else {
                if (addRequest) add_members(list);
                if (removeRequest) remove_members(list);
            }
        }
    }
};