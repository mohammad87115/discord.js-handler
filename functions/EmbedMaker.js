const { EmbedBuilder } = require("discord.js")
module.exports = class Embed {
    constructor() {
        this.type = "info";
        this.title = "Untitled";
        this.message = "Empty message";
    }
    setType(type) {
        this.type = type
        return this
    }
    setTitle(title) {
        this.title = title
        return this
    }
    setMessage(msg) {
        this.message = msg
        return this
    }
    make() {
        let emoji = ""
        if (this.type === "info") emoji = "ℹ️"
        if (this.type === "warning") emoji = "⚠️"
        if (this.type === "error") emoji = "❌"
        
        const embed = new EmbedBuilder()
            .setTitle(`${emoji}  ${this.title}`)
            .setDescription(`${this.message}`)
            .setTimestamp()
            .setColor(require("../config.js").color)

        return embed

    }

    
}
