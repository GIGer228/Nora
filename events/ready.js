const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.conversations = new Array();
        client.get_conversation = (host) => {
            return client.conversations.find(c => c.host == host);
        };
        console.log(`${client.user.tag} client is ready!`);
    },
};