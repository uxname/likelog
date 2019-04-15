const ConsoleAppender = require('./ConsoleAppender');
const ServerAppender = require('./ServerAppender');

const LEVELS = {
    TRACE: 1,
    DEBUG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
};

class Likelog {
    constructor(config) {
        if (!config || !config.appenders) throw Error('Wrong config');
        this.appenders = config.appenders;
        this.showLevels = config.showLevels || [LEVELS.TRACE, LEVELS.DEBUG, LEVELS.INFO, LEVELS.WARN, LEVELS.ERROR];

        this.appenders.forEach(item => {
            item.name = config.name;
            item.showDate = config.showDate;
            item.customPrefix = config.customPrefix;
        });
    }

    trace() {
        if (!this.showLevels.includes(LEVELS.TRACE)) return;
        this.appenders.forEach(item => item.trace(...arguments));
    }

    debug() {
        if (!this.showLevels.includes(LEVELS.DEBUG)) return;
        this.appenders.forEach(item => item.debug(...arguments));
    }

    info() {
        if (!this.showLevels.includes(LEVELS.INFO)) return;
        this.appenders.forEach(item => item.info(...arguments));
    }

    warn() {
        if (!this.showLevels.includes(LEVELS.WARN)) return;
        this.appenders.forEach(item => item.warn(...arguments));
    }

    error() {
        if (!this.showLevels.includes(LEVELS.ERROR)) return;
        this.appenders.forEach(item => item.error(...arguments));
    }
}

module.exports = {
    Likelog: Likelog,
    LEVELS: LEVELS,
    ConsoleAppender: ConsoleAppender,
    ServerAppender: ServerAppender
};

