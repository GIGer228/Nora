const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('simple_answer')
        .setDescription('Answers your question with "yes" or "no".')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('The question you wanna get answer to.')
                .setRequired(true)
        ),
    async execute(interaction) {
        var answer = 'yes';
        if (Math.floor(Math.random() * 10 + 1) % 2 == 1) {
            answer = 'no';
        }
        await interaction.reply(answer);
    },
};