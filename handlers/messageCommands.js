const fs = require('node:fs');
const path = require('node:path');

module.exports = async (client) => {

    const foldersPath = path.join(__dirname, '../commands/message');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('name' in command.data && 'execute' in command) {
                client.messageCommands.set(command.data.name, command);
            }
        }
    }
}