const chalk = require("chalk")
module.exports = {
    log: function (text) {
        console.log(chalk.green.bold("LOG ") + chalk.dim(`» `) + chalk.white(text))
    },
    warn: function (text) {
        console.log(chalk.yellow.bold("WARNING ") + chalk.dim(`» `) + chalk.yellow(text))
    },
    error: function (text) {
        console.log(chalk.red.bold("ERROR ") + chalk.dim(`» `) + chalk.red(text))
    }
}