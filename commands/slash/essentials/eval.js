const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('JavaScript eval()')
		.addBooleanOption((option) => option.setName('ephemeral').setDescription('Only you can see the response')),
	async execute(interaction) {

        if (!interaction.client.config.ownerIds.includes(interaction.user.id)) await interaction.reply("No perms")

        const modal = new ModalBuilder()
            .setCustomId('eval-modal')
            .setTitle('Eval');

		const input = new TextInputBuilder()
			.setCustomId('input')
			.setLabel("Code to eval")
			.setStyle(TextInputStyle.Paragraph);

		const row = new ActionRowBuilder().addComponents(input);

		modal.addComponents(row);

		await interaction.showModal(modal);

        const filter = (i) => i.customId === 'eval-modal' && i.user.id === interaction.user.id;

        const i = await interaction.awaitModalSubmit({ filter, time: 600000 })

        const code = i.fields.getTextInputValue('input');

        if (interaction.options.getBoolean('ephemeral')) {
			await i.deferReply({ ephemeral: true });
		} else {
			await i.deferReply();
		}

        try {
            const evaled = eval(code);

            const embed = new EmbedBuilder()
                .setTitle('Eval')
                .setColor('Green')
                .setDescription(`\`\`\`${evaled}\`\`\``)
                .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
			    .setTimestamp()

            await i.editReply({ embeds: [embed] })
        } catch(error) {
            const embed = new EmbedBuilder()
                .setTitle('Eval Failed')
                .setColor('Red')
                .setDescription(`\`\`\`${error}\`\`\``)
                .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
			    .setTimestamp()

            await i.editReply({ embeds: [embed] })
        }
	},
};


