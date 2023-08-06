const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription("pause musique actuellement jouée"),
    run: async ({client, interaction}) => {
        const queue = client.player.queues.get(interaction.guild);

        if (!queue) {
            await interaction.reply("Pas de musique jouée actuellement par le chiengue");
            return;
        }

        const currentSong = queue.currentTrack;

        queue.node.pause();

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**${currentSong.title}** mis en pause, direction la pause caca`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}