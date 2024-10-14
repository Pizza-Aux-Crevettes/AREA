const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, joinVoiceChannel } = require('@discordjs/voice');

const player = createAudioPlayer();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song in the voice channel you are in.'),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: "You need to be in a voice channel for me to join you.", ephemeral: true });
        }

        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            // Audio file URL
            const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Your audio file URL
            const resource = createAudioResource(audioUrl);
    
            player.on(AudioPlayerStatus.Playing, () => {
                console.log('The player is now playing!');
            });

            player.on(AudioPlayerStatus.Idle, () => {
                console.log('The player is idle!');
                connection.destroy();
            });

            player.play(resource);
            connection.subscribe(player);

            await interaction.reply(`I am now playing: **${audioUrl}** in your voice channel.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`An error occurred: ${error.message}`);
        }
    },
};
