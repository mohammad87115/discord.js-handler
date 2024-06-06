// registering an event to handle slash commands
const logger = require('../functions/logging.js')
const Embed = require("../functions/EmbedMaker.js")
module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
    
            if (!command) {
                const embed = new Embed()
                    .setType('error')
                    .setTitle('Command Error')
                    .setMessage(`No command matching ${interaction.commandName} was found.`)
                    .make();
                await interaction.reply({ embeds: [embed] });
                return;
            }
        
            try {
                await command.execute(interaction);
            } catch (error) {
                const embed = new Embed()
                    .setType('error')
                    .setTitle('Execution Error')
                    .setMessage(`There was an error while executing this command!`)
                    .make();
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ embeds: [embed], ephemeral: true });
                } else {
                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
                logger.error(error)
            }
        }
	},
};