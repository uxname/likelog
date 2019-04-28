const ConsoleAppender = require('./ConsoleAppender');
const ServerAppender = require('./ServerAppender');
const Levels = require('./Consts').Levels;

class Likelog {
    constructor(config) {
        if (!config || !config.appenders) throw Error('Wrong config');
        this.appenders = config.appenders;
    }

    trace() {
        this.appenders.forEach(item => item.trace(...arguments));
    }

    debug() {
        this.appenders.forEach(item => item.debug(...arguments));
    }

    info() {
        this.appenders.forEach(item => item.info(...arguments));
    }

    warn() {
        this.appenders.forEach(item => item.warn(...arguments));
    }

    error() {
        this.appenders.forEach(item => item.error(...arguments));
    }
}

module.exports = {
    Likelog: Likelog,
    Levels: Levels,
    ConsoleAppender: ConsoleAppender,
    ServerAppender: ServerAppender
};

