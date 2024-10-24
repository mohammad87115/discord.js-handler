const chalk = require("chalk")
module.exports = {
    log: function (text) {
        console.log(chalk.green.bold("Log ") + chalk.dim(`» `) + chalk.white(text))
    },
    warn: function (text) {
        console.log(chalk.yellow.bold("Warning ") + chalk.dim(`» `) + chalk.white(text))
    },
    error: function (text) {
        console.log(chalk.red.bold("Error ") + chalk.dim(`» `) + chalk.white(text))
    }
}