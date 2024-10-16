const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, joinVoiceChannel } = require('@discordjs/voice');

const player = createAudioPlayer();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song in the voice channel you are in.'),
    async execute(interaction) {
        console.log("je suis là?");

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: "Vous devez être dans un salon vocal.", ephemeral: true });
        }

        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
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

            await interaction.reply(`Je joue maintenant : **${audioUrl}** dans votre salon vocal.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `Une erreur est survenue : ${error.message}`, ephemeral: true });
        }
    },
};
