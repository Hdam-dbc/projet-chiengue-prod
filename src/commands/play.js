const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player");
const { YouTubeExtractor } = require('@discord-player/extractor');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription("Chiengue joue musik")
    .addSubcommand(subcommand =>
        subcommand
            .setName("search")
            .setDescription("Recherche songue et le joue")
            .addStringOption(option =>
                option.setName("searchterms").setDescription("Recherche mot clés").setRequired(true)
            )
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("playlist")
            .setDescription("Chiengue joue playlist depuis YTB")
            .addStringOption(option => option.setName("url").setDescription("URL 2 PLAYLIST").setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("song")
            .setDescription("CHIENGUE joue son de YTB")
            .addStringOption(option => option.setName("url").setDescription("URL DE SONGUE").setRequired(true))
    ),
    
    run: async ({ interaction, client }) => {
        if (!interaction.member.voice.channel) {
            await interaction.reply("Va a la niche pour jouer musik");
            return;
        }

        const queue = await client.player.nodes.create(interaction.guild);
        await client.player.extractors.register(YouTubeExtractor, {});

        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        let embed = new EmbedBuilder();
        if(interaction.options.getSubcommand() === "song"){
            let url = interaction.options.getString("url");

            const result = await client.player.search(url, {
                requestBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_SEARCH,
            });


            if (result.tracks.length === 0) {
                await interaction.reply("G pa trouvé");
                return;
            }

            const song = result.tracks[0]
            await queue.addTrack(song);

            embed
                .setDescription(`**[${song.title}](${song.url})** ajouté à la file d'attente ouaf`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `Durée: ${song.duration}`});
        }
        else if(interaction.options.getSubcommand() === "playlist"){
            let url = interaction.options.getString("url");

            const result = await client.player.search(url, {
                requestBy: interaction.user.tag,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            });

            if (result.tracks.length === 0) {
                await interaction.reply("G pa trouvé");
                return;
            }

            const playlist = result.playlist
            await queue.addTrack(playlist);

            embed
                .setDescription(`**[${playlist.title}](${playlist.url})** ajouté à la file d'attente ouaf`)
                .setThumbnail(playlist.thumbnail)
                .setFooter({text: `Durée: ${playlist.duration}`});
        }
        else if(interaction.options.getSubcommand() === "search"){
            let url = interaction.options.getString("searchterms");

            const result = await client.player.search(url, {
                requestBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            if (result.tracks.length === 0) {
                await interaction.reply("G pa trouvé");
                return;
            }

            const song = result.tracks[0]
            await queue.addTrack(song);

            embed
                .setDescription(`**[${song.title}](${song.url})** ajouté à la file d'attente ouaf`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `Durée: ${song.duration}`});
        }
        if (!queue.isPlaying()) await queue.node.play();
        await interaction.reply({ embeds: [embed]});
    }
        
}