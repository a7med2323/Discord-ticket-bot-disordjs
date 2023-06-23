require('dotenv').config();
const { CommandHandler } = require('djs-commander');
const path = require('path');
const config = require('./config');
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');


// Create a new client instance
const client = new Client({ intents: [ GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    ] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
new CommandHandler({
    client, // Discord.js client object | Required by default
    commandsPath: path.join(__dirname, 'src/commands'), // The commands directory
    eventsPath: path.join(__dirname, 'src/events'), // The events directory
    testServer: config.serverId, // To register guild-based commands (if it's not provided commands will be registered globally)
  });
// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
