const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription("relance musique actuellement jouée"),
    run: async ({client, interaction}) => {
        const queue = client.player.queues.get(interaction.guild);

        if (!queue) {
            await interaction.reply("Pas de musique jouée actuellement par le chiengue");
            return;
        }

        const currentSong = queue.currentTrack;

        queue.node.resume();

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Et ça repart sur **${currentSong.title}**`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}