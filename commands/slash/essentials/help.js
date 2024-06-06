const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require("discord.js")
const fs = require("node:fs")
const Embed = require("../../../functions/EmbedMaker.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Learn how to use the bot'),
	async execute(interaction) {
        const commandFolders = fs.readdirSync('./commands/slash');

        const selectmenu = new StringSelectMenuBuilder()
            .setCustomId("helpmenu")
            .setPlaceholder("Select a category")
            .addOptions(
                commandFolders.map((item) => {
                    return new StringSelectMenuOptionBuilder()
                        .setLabel(item)
                        .setValue(item)
                })
            )
        const row = new ActionRowBuilder()
            .addComponents(selectmenu);

        const response = await interaction.reply({ components: [row] })
        
        const filter = i => i.user.id === interaction.user.id
        const collector = await response.createMessageComponentCollector({ filter: filter, componentType: ComponentType.StringSelect, time: 10_000 });
        
        collector.on('collect', async (i) => {
            const commands = fs.readdirSync(`./commands/slash/${i.values[0]}`).map((cmd) => cmd.replace(".js", ""))
            const appcommands = await interaction.client.application.commands.fetch();
            console.log(appcommands)
            const commandAndIds = [commands.map((cmd => {
                const matched = appcommands.find(c => c.name === cmd)
                console.log(matched)
                return {name: `</${matched.name}:${matched.id}>`, desc: matched.description}
            }))]
            await i.update(commandAndIds.join("\n\n"));
        });
        
        collector.once('end', async (i) => {
            await interaction.editReply({ components: [new ActionRowBuilder().addComponents(selectmenu.setDisabled(true).setPlaceholder("SelectMenu is expired"))] })
        })
            
	},
};