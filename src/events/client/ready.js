module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
      try {
        console.log(`Logged in as ${client.user.tag}!`);
  
        // Set the bot's status
        client.user.setActivity("Monitoring messages", { type: "WATCHING" });
  
        // Log additional information
        console.log(`Bot is active in ${client.guilds.cache.size} guild(s).`);
        client.guilds.cache.forEach((guild) => {
          console.log(`- ${guild.name} (ID: ${guild.id})`);
        });
  
        // Log the number of channels and users the bot can see
        const totalChannels = client.channels.cache.size;
        const totalUsers = client.users.cache.size;
        console.log(`Bot can see ${totalChannels} channels and ${totalUsers} users.`);
  
        // Additional initialization if needed
        // e.g., loading commands, setting up scheduled tasks, etc.
  
      } catch (error) {
        console.error("Error during the ready event:", error);
      }
    },
  };