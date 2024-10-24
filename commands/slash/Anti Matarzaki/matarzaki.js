const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const fs = require('node:fs')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('matarzaki')
	.setDescription('Get matarzaki sex')
    .addSubcommand(
        (sub) => 
            sub
            .setName('test')
            .setDescription("Checks if the mentioned user is matarzaki")
            .addUserOption(
                (option) => 
                    option
                    .setName('user')
                    .setDescription('User who\'s gonna get checked')
                    .setRequired(true)
            )
    )
    .addSubcommandGroup(
        (group) => 
            group
            .setName('list')
            .setDescription('list of matarzakis')
            .addSubcommand(
                (sub) => 
                    sub
                    .setName('get')
                    .setDescription('get the matarzaki list')
            )
            .addSubcommand(
                (sub) => 
                    sub
                    .setName('add')
                    .setDescription('add a matarzaki to the database')
                    .addUserOption(
                        (option) => 
                            option
                            .setName('user')
                            .setDescription('The matarzaki you want to add')
                            .setRequired(true)
                    )
            )
            .addSubcommand(
                (sub) => 
                    sub
                    .setName('remove')
                    .setDescription('remove a matarzaki from the database')
                    .addUserOption(
                        (option) => 
                            option
                            .setName('user')
                            .setDescription('The non-matarzaki you want to remove')
                            .setRequired(true)
                    )
            )
    ),
	async execute(interaction) {
        const sub = interaction.options.getSubcommand()
        const group = interaction.options.getSubcommandGroup()

        const matarzaki = await interaction.client.kv.get('matarzaki_list') || [];

        if (group === 'list') {
            if (sub === 'get') {
                const embed = new EmbedBuilder()
                    .setTitle('Matarzaki list')
                    .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTimestamp()
                
                if (!matarzaki.length) {
                    embed.setDescription('No matarzaki found in the database')
                    await interaction.reply({ embeds: [embed] })
                } else {
                    const matarzakiFormated = matarzaki.map((m) => `<@${m}> - ${m}`).join('\n')
                    embed.setDescription(matarzakiFormated)
                    await interaction.reply({ embeds: [embed] })
                }
            }
            if (sub === 'add') {
                if (!interaction.client.config.ownerIds.includes(interaction.user.id)) {
                    const embed = new EmbedBuilder()
                        .setTitle('Error')
                        .setDescription('You need to be the bot owner to use this command')
                        .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
                        .setTimestamp()
                    await interaction.reply({ embeds: [embed] })
                    return;
                }

                const user = interaction.options.getUser('user');

                if (matarzaki.includes(user.id)) {
                    const embed = new EmbedBuilder()
                        .setTitle('Error')
                        .setDescription('This matarzaki is already registered in my database')
                        .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
                        .setTimestamp()
                    await interaction.reply({ embeds: [embed] })
                    return;
                }

                await interaction.client.kv.push('matarzaki_list', user.id)

                const embed = new EmbedBuilder()
                    .setTitle('Matarzaki add')
                    .setDescription(`Added ${user} to matarzaki list`)
                    .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTimestamp()

                await interaction.reply({ embeds: [embed] })
            }
            if (sub === 'remove') {
                if (!interaction.client.config.ownerIds.includes(interaction.user.id)) {
                    const embed = new EmbedBuilder()
                        .setTitle('Error')
                        .setDescription('You need to be the bot owner to use this command')
                        .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
                        .setTimestamp()
                    await interaction.reply({ embeds: [embed] })
                    return;
                }

                const user = interaction.options.getUser('user');

                if (!matarzaki.includes(user.id)) {
                    const embed = new EmbedBuilder()
                        .setTitle('Error')
                        .setDescription('This matarzaki is not registered in my database')
                        .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
                        .setTimestamp()
                    await interaction.reply({ embeds: [embed] })
                    return;
                }

                await interaction.client.kv.pull('matarzaki_list', user.id)

                const embed = new EmbedBuilder()
                    .setTitle('Matarzaki remove')
                    .setDescription(`Removed ${user} from matarzaki list`)
                    .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTimestamp()

                await interaction.reply({ embeds: [embed] })
            }
        } else
        if (sub === 'test') {
            const user = interaction.options.getUser('user');

            const embed = new EmbedBuilder()
                .setTitle('Matarzaki test')
                .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName}`, iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp()

            if (matarzaki.includes(user.id)) {
                embed.setDescription('مترزکیو نگا خداییش')
                await interaction.reply({ embeds: [embed] })
            } else {
                embed.setDescription('مترزکی نمیبینم که')
                await interaction.reply({ embeds: [embed] })
            }
        }

	},
};


