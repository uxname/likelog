const ConsoleAppender = require('./ConsoleAppender');
const ServerAppender = require('./ServerAppender');
const Levels = require('./Consts').Levels;

class Likelog {
    constructor(config) {
        if (!config || !config.appenders) throw Error('Wrong config');
        this.appenders = config.appenders;

        if (config.handleAllErrors) {
            if (!window) return this.warn('Handle all errors disabled: "window" does not exist');
            const thisLink = this;
            window.onerror = function (message, url, lineNumber) {
                const link = `${url}:${lineNumber}`;
                thisLink.error(`\n[${link}]\n${message}`);
                return true;
            };
        }
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

