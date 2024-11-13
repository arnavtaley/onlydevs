const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.handleCommands = async () => {
    try {
      const commandFolders = fs.readdirSync(
        path.join(__dirname, "../../commands")
      );
      for (const folder of commandFolders) {
        const commandFiles = fs
          .readdirSync(path.join(__dirname, `../../commands/${folder}`))
          .filter((file) => file.endsWith(".js"));

        const { commands, commandArray } = client;
        for (const file of commandFiles) {
          const command = require(path.join(
            __dirname,
            `../../commands/${folder}/${file}`
          ));
          if (!command.data || !command.data.name) {
            console.warn(
              `Command file ${file} is missing a data or name property.`
            );
            continue;
          }

          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          console.log(`Command: ${command.data.name} has been registered`);
        }
      }
    } catch (error) {
      console.error("Error loading commands:", error);
    }
  };
};
