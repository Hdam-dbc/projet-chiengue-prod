const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription("skip musique actuellement jouée"),
    run: async ({client, interaction}) => {
        const queue = client.player.queues.get(interaction.guild);

        if (!queue) {
            await interaction.reply("Pas de musique jouée actuellement par le chiengue");
            return;
        }

        const currentSong = queue.currentTrack;

        queue.node.skip();

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`<@${interaction.user.id}> a pissé sur **${currentSong.title}** je l'ai vu !`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}