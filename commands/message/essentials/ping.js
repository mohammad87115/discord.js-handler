const { prefix } = require('../../../config.js')
module.exports = {
	data: {
        name: "ping",
        description: "Replies with pong!",
        aliases: ["p"],
        args: true,
        usage: `${prefix}ping`,
    },
	async execute(message, args) {
		await message.reply('Pong!');
	},
};