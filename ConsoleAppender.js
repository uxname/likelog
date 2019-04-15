const tools = require('./tools');

class ConsoleAppender {
    constructor() {
        this.showDate = false;
        this.name = null;
        this.customPrefix = null;
    }

    trace() {
        return console.log(
            tools.generatePrefix('trace', this.name, this.customPrefix, this.showDate),
            'background: #3399ff; color: #FFFFFF',
            ...arguments
        );
    }

    debug() {
        return console.log(
            tools.generatePrefix('debug', this.name, this.customPrefix, this.showDate),
            'background: #00ff99; color: #000000',
            ...arguments
        );
    }

    info() {
        return console.log(
            tools.generatePrefix('info', this.name, this.customPrefix, this.showDate),
            'background: #ffff00; color: #000000',
            ...arguments
        );
    }

    warn() {
        return console.log(
            tools.generatePrefix('warn', this.name, this.customPrefix, this.showDate),
            'background: #ff9900; color: #000000',
            ...arguments
        );
    }

    error() {
        return console.log(
            tools.generatePrefix('error', this.name, this.customPrefix, this.showDate),
            'background: #cc0000; color: #FFFFFF',
            ...arguments
        );
    }
}

module.exports = ConsoleAppender;
