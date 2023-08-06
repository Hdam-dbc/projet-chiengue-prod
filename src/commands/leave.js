const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription("clear la queue et quitte"),
    run: async ({client, interaction}) => {
        const queue = client.player.queues.get(interaction.guild);

        if (!queue) {
            await interaction.reply("Pas de musique jouée actuellement par le chiengue");
            return;
        }


        queue.delete();

        await interaction.reply("Chiengue retourne manger poissongue")
    }
}