const path = require('node:path');
const { Events, ChatInputCommandInteraction } = require('discord.js');
const configPath = path.resolve('config.json')
const { clientId } = require(configPath);

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const channel = message.channel;
        const author = message.author;
        const content = message.content;

        if (author.id == clientId) return;
        if (!message.mentions.parsedUsers.some(user => user.id == clientId)) return;

        console.log(`[Message created] User ${message.author.username} said "${message.content}"`);
        
        message.reply(`Hi ${author}! If you wanna chat a bit, use command \`/start_chat\` OwO`);
    }
};