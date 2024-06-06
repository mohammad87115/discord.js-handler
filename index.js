// Importing discord.js, chalk & logger
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const logger = require("./functions/logging.js");
const chalk = require("chalk")

// Creating a new Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});

/* ----- Variables ----- */
client.commands = new Collection();
client.messageCommands = new Collection();
client.cooldowns = new Collection();
client.config = require("./config.js")

/* ----- Handlers ----- */
require("./handlers/events.js")(client)
require("./handlers/slashCommands.js")(client)
require("./handlers/messageCommands.js")(client)


/* ----- Anti Crash -----*/
process.on("unhandledRejection", (reason, p) => {
   console.log(chalk.gray("————————————————————————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Unhandled Rejection/Catch")
   );
   console.log(chalk.gray("————————————————————————————————————————————————————"));
   console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
   console.log(chalk.gray("————————————————————————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Uncaught Exception/Catch")
   );
   console.log(chalk.gray("————————————————————————————————————————————————————"));
   console.log(err, origin);
});


/* ----- Logging in ----- */
logger.log("Trying to login with the token ...")
client.login(client.config.token)
