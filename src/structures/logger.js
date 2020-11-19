const chalk = require('chalk');

class Logger {
    /**
     * @param {Object} options logger options
     * @param {Boolean} options.formatDate ISO 8601 format date
     */
    constructor(options = {
        formatDate: true,
    }) {
        this.options = options;
    }

    check(text, title = this.check.name) {
        console.log(this.createMessage(text, title, "✔️", "greenBright"));
    }

    error(text, title = this.error.name) {
        console.log(this.createMessage(text, title, "❌", "redBright"));
    }

    warn(text, title = this.warn.name) {
        console.log(this.createMessage(text, title, "🔥", "yellowBright"));
    }

    info(text, title = this.info.name) {
        console.log(this.createMessage(text, title, "🔵", "cyanBright"));
    }

    createMessage(text, title, emoji, color) {
        let date = `[${this.returnDate()}]`;
        title = title.toUpperCase();

        const send = chalk`{${color} ${emoji} ${chalk.inverse.bold(title)} ${date} ${chalk.white(text)}}`;
        return send;
    }

    /**
     * @returns {String} ISO 8601 formated date or time
     */
    returnDate() {
        let date = new Date();
        if(this.options.formatDate === false) return date.getTime();
        else date = new Intl.DateTimeFormat('en-GB').format(date);
        return date;
    }
}

module.exports = Logger;
