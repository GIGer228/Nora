const path = require('node:path');
const { Events } = require('discord.js');
const configPath = path.resolve('config.json')
const { clientId } = require(configPath);

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.id == clientId) return;

        console.log(`[Message created] User ${message.author.username} said "${message.content}"`);
        var content = message.content.split(' ')[0];
        console.log(`First word: ${content}, typeof: ${typeof content}, parseInt: ${parseInt(content)}`);
        if (parseInt(3) == parseInt(3.14)) {
            message.reply('Hi 0.0/');
        }

        message.channel.send(`${parseInt(content) + 1}`);
    }
};