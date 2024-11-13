require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const { TOKEN } = process.env;

// Initialize the client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.commandArray = [];

// Load function handlers
const loadFunctions = (client) => {
  const functionFolders = fs.readdirSync(path.join(__dirname, "./functions"));
  for (const folder of functionFolders) {
    const functionFiles = fs
      .readdirSync(path.join(__dirname, `./functions/${folder}`))
      .filter((file) => file.endsWith(".js"));

    for (const file of functionFiles) {
      require(path.join(__dirname, `./functions/${folder}/${file}`))(client);
    }
  }
};

// Ensure handleEvents and handleCommands are defined
const initializeHandlers = (client) => {
  ["handleEvents", "handleCommands"].forEach((fn) => {
    if (typeof client[fn] === "function") {
      client[fn]();
    } else {
      console.error(`${fn} function is not defined.`);
    }
  });
};

// Load functions and initialize handlers
try {
  loadFunctions(client);
  initializeHandlers(client);
} catch (error) {
  console.error("Error initializing handlers:", error);
}

// Log in to Discord
client.login(TOKEN).catch(console.error);
