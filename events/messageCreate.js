const Embed = require("../functions/EmbedMaker.js");

const MatarzakiFunc = require('../functions/Matarzaki.js')

module.exports = {
	name: "messageCreate",
	async execute(message) {
        if (!message.content.startsWith(message.client.config.prefix) || message.author.bot) return;

        const args = message.content.slice(message.client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!message.client.messageCommands.has(commandName)) return;
    
        const command = message.client.messageCommands.get(commandName) || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        console.log(args)
        if (command.data.args && !args.length) {
            let msg = `You didn't provide any arguments!`;

            if (command.usage) msg += `\nYou need to input the command like this: \`${command.usage}\``;

            await message.reply({ content: msg });
            return;
        }


        
        try {
            await command.execute(message, args);
        } catch (error) {
            await message.reply({ content: 'there was an error trying to execute that command!' });
            logger.error(error)
        }    
    },
};