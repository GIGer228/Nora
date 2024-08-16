const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const guild = interaction.guild.name;
        const channel = interaction.channel.name;
        const user = interaction.user.username;
        const commandName = interaction.commandName;

        console.log(`[Triggered interaction] ${commandName} by ${user} in ${guild}, ${channel}`);

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.log(`No command matching ${interaction.commandName} was found.`);
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error with executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error with executing this command!', ephemeral: true });
            }
        }
    },
};