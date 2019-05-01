const ConsoleAppender = require('./ConsoleAppender');
const ServerAppender = require('./ServerAppender');
const Levels = require('./Consts').Levels;

function isBrowser() {
    return typeof window !== 'undefined'
}

class Likelog {
    constructor(config) {
        if (!config || !config.appenders) throw Error('Wrong config');
        this.appenders = config.appenders;

        this.timeMap = new Map();

        if (config.handleAllErrors) {
            const thisLink = this;

            if (isBrowser()) {
                window.onerror = function (message, url, lineNumber) {
                    const link = `${url}:${lineNumber}`;
                    thisLink.error(`\n[${link}]\n${message}`);
                    return true;
                };
            } else {
                process.on('uncaughtException', function (err) {
                    thisLink.error(err);
                });
            }
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

    time(title) {
        const now = typeof window === 'undefined' ? Date.now() : performance.now();
        this.timeMap.set(title, now);
    }

    timeEnd(title, level = Levels.TRACE) {
        const now = !isBrowser() ? Date.now() : performance.now();
        const time = Number((now - this.timeMap.get(title)).toFixed(3));
        switch (level) {
            case Levels.TRACE:
                this.trace(title + ':', time);
                break;
            case Levels.DEBUG:
                this.debug(title + ':', time);
                break;
            case Levels.INFO:
                this.info(title + ':', time);
                break;
            case Levels.WARN:
                this.warn(title + ':', time);
                break;
            case Levels.ERROR:
                this.error(title + ':', time);
                break;
            default :
                this.trace(title + ':', time);
                break;

        }
    }
}

module.exports = {
    Likelog: Likelog,
    Levels: Levels,
    ConsoleAppender: ConsoleAppender,
    ServerAppender: ServerAppender
};

