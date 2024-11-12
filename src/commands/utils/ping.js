const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the bot's latency and API ping."),

  async execute(interaction, client) {
    try {
      await interaction.deferReply({ fetchReply: true });

      const { ws: { ping: apiLatency } } = client;
      const botLatency = Date.now() - interaction.createdTimestamp;
      const adjustedBotLatency = Math.max(botLatency, 0);

      const pingEmbed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle('🏓 Pong!')
        .setDescription('Here are the latency details:')
        .addFields(
          { name: 'API Latency', value: `${apiLatency} ms`, inline: true },
          { name: 'Bot Latency', value: `${adjustedBotLatency} ms`, inline: true }
        )
        .setFooter({ text: 'Lower latency means better performance!' });

      await interaction.editReply({ embeds: [pingEmbed] });
    } catch (error) {
      console.error("Error executing ping command:", error);
      await interaction.editReply("There was an error while executing this command.");
    }
  },
};