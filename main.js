// Setup our environment variables via dotenv
require('dotenv').config();

// Import relevant classes from discord.js
const { Client, Intents } = require('discord.js');
// Instantiate a new client with some necessary parameters.
const client = new Client(
    { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }
);
// Notify progress
client.on('ready', function(e){
    console.log(`Logged in as ${client.user.tag}!`);
});
// Authenticate
client.login(process.env.DISCORD_TOKEN);

var command = require('./function/command');
command.firstSay(client);
command.statusMyAccount(client);
command.login(client);