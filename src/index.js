require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const { Player } = require("discord-player");

const path = require('path');

const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, './commands'),
    eventsPath: path.join(__dirname, './events'),
    validationsPath: path.join(__dirname, './validations'),
    testServer: process.env.GUILD_ID,
});

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1<<25
    }
});

client.login(process.env.TOKEN);