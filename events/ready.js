const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.conversations = new Array();
        client.get_conversation = (user) => {
            return client.conversations.find(c => c.userList.includes(user));
        };
        console.log(`${client.user.tag} client is ready!`);
    },
};