const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        console.log(`Commande ${command.data.name} chargée`);
        client.commands.set(command.data.name, command);
    }
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
        console.log(message.author.bot)
    if (message.author.bot) {
        return;
    }

    if (message.content.includes("reply")) {
        const cleanedMessage = message.content.replace(/reply/i, '').trim();
        await message.reply(`Vous avez dit : "${cleanedMessage}"`)
            .then(() => console.log(`Replied to message successfully`))
            .catch(console.error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Une erreur est survenue en exécutant cette commande!', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
