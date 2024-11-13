const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.handleEvents = async () => {
    try {
      const eventFolders = fs.readdirSync(path.join(__dirname, "../../events"));
      for (const folder of eventFolders) {
        const eventFiles = fs
          .readdirSync(path.join(__dirname, `../../events/${folder}`))
          .filter((file) => file.endsWith(".js"));

        for (const file of eventFiles) {
          const event = require(path.join(
            __dirname,
            `../../events/${folder}/${file}`
          ));
          if (!event.name) {
            console.warn(`Event file ${file} is missing a name property.`);
            continue;
          }

          if (event.once) {
            client.once(event.name, (...args) => {
              try {
                event.execute(...args, client);
              } catch (error) {
                console.error(`Error executing event ${event.name}:`, error);
              }
            });
          } else {
            client.on(event.name, (...args) => {
              try {
                event.execute(...args, client);
              } catch (error) {
                console.error(`Error executing event ${event.name}:`, error);
              }
            });
          }

          console.log(`Loaded event: ${event.name} from ${file}`);
        }
      }
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };
};
