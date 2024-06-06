// Importing discord.js, chalk & logger
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const logger = require("./functions/logging.js");
const chalk = require("chalk")

// Creating a new Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

/* ----- Logging in ----- */
logger.log("Trying to login with the token ...")
client.login(require("./config.js").token)
