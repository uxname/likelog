const tools = require('./tools');
const {Levels} = require('./Consts');

class ConsoleAppender {
    constructor(config) {
        this.showDate = config.showDate || false;
        this.name = config.name || null;
        this.customPrefix = config.customPrefix || null;
        this.showDate = config.showDate || false;
        this.showLevels = config.showLevels || [Levels.TRACE, Levels.DEBUG, Levels.INFO, Levels.WARN, Levels.ERROR];
    }

    trace() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.TRACE)) return;
        return console.log(
            tools.generatePrefix('trace', this.name, this.customPrefix, this.showDate),
            'background: #3399ff; color: #FFFFFF',
            ...arguments
        );
    }

    debug() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.DEBUG)) return;
        return console.log(
            tools.generatePrefix('debug', this.name, this.customPrefix, this.showDate),
            'background: #00ff99; color: #000000',
            ...arguments
        );
    }

    info() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.INFO)) return;
        return console.log(
            tools.generatePrefix('info', this.name, this.customPrefix, this.showDate),
            'background: #ffff00; color: #000000',
            ...arguments
        );
    }

    warn() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.WARN)) return;
        return console.log(
            tools.generatePrefix('warn', this.name, this.customPrefix, this.showDate),
            'background: #ff9900; color: #000000',
            ...arguments
        );
    }

    error() {
        if (this.showLevels && !this.showLevels.includes(Levels.ERROR)) return;
        return console.log(
            tools.generatePrefix('error', this.name, this.customPrefix, this.showDate),
            'background: #cc0000; color: #FFFFFF',
            ...arguments
        );
    }
}

module.exports = ConsoleAppender;
