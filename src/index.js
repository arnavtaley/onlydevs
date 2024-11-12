require("dotenv").config();
const { TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

// Initialize the client with necessary intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

// Load function handlers
fs.readdirSync('./src/functions').forEach(folder => {
  fs.readdirSync(`./src/functions/${folder}`)
    .filter(file => file.endsWith('.js'))
    .forEach(file => require(`./functions/${folder}/${file}`)(client));
});

// Ensure handleEvents and handleCommands are defined
['handleEvents', 'handleCommands'].forEach(fn => {
  if (typeof client[fn] === 'function') {
    client[fn]();
  } else {
    console.error(`${fn} function is not defined.`);
  }
});
  
// Log in to Discord
client.login(TOKEN).catch(console.error);
