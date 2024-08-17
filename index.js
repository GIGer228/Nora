const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const Conversation = require('./conversation.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions] });
// #region Accessing commands
client.commands = new Collection();
const commandFoldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandFoldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(commandFoldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}
// #endregion
// #region Accessing events
const eventFoldersPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventFoldersPath).filter(file => file.endsWith('.js'));

for (file of eventFiles) {
    const filePath = path.join(eventFoldersPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
// #endregion

client.conversations = new Array();

client.login(token);