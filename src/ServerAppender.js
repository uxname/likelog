const uuid = require('uuid-random');
const {Levels} = require('./Consts');

function pushLog(level, name, customPrefix, values, logCache, maxCacheSize) {
    if (logCache.logArray.length >= maxCacheSize) {
        logCache.logArray.splice(0, 1)
    }
    const log = {
        uuid: uuid(),
        level: level,
        name: name,
        customPrefix: customPrefix,
        date: Date.now(),
        values: values
    };

    logCache.logArray.push(log)
}

async function sendLogs(url, logCache) {
    if (logCache.logArray.length === 0) return;

    const tempLogArray = logCache.logArray;
    logCache.logArray = [];

    const fetchOptions = {
        "mode": "cors",
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(tempLogArray)
    };

    try {
        const response = await fetch(url, fetchOptions);

        const res = await response.json();
        if (res.result !== 'ok') {
            console.log(`Send logs fail (logs count:${tempLogArray.length}), revert cache: result is not "ok"`);
            logCache.logArray = [...tempLogArray, ...logCache.logArray];
        }
    } catch (e) {
        console.log(`Send logs fail (logs count:${tempLogArray.length}), revert cache:`, e.message);
        logCache.logArray = [...tempLogArray, ...logCache.logArray];
    }
}


class ServerAppender {
    constructor(config) {
        if (
            !config ||
            !config.url
        ) throw Error('Wrong config');

        this.url = config.url;
        this.name = config.name || null;
        this.customPrefix = config.customPrefix || null;
        this.sendInterval = config.sendInterval || 5000;
        this.maxCacheSize = config.maxCacheSize || 1000;
        this.showLevels = config.showLevels || [Levels.TRACE, Levels.DEBUG, Levels.INFO, Levels.WARN, Levels.ERROR];

        this.logCache = {logArray: []};

        setInterval(async () => {
            await sendLogs(this.url, this.logCache);
        }, this.sendInterval)
    }

    trace() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.TRACE)) return;
        return pushLog(
            'trace',
            this.name,
            this.customPrefix,
            [...arguments],
            this.logCache,
            this.maxCacheSize
        );
    }

    debug() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.DEBUG)) return;
        return pushLog(
            'debug',
            this.name,
            this.customPrefix,
            [...arguments],
            this.logCache,
            this.maxCacheSize
        );
    }

    info() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.INFO)) return;
        return pushLog(
            'info',
            this.name,
            this.customPrefix,
            [...arguments],
            this.logCache,
            this.maxCacheSize
        );
    }

    warn() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.WARN)) return;
        return pushLog(
            'warn',
            this.name,
            this.customPrefix,
            [...arguments],
            this.logCache,
            this.maxCacheSize
        );
    }

    error() {
        if (this.showLevels && !this.showLevels.includes(Levels.ERROR)) return;
        return pushLog(
            'error',
            this.name,
            this.customPrefix,
            [...arguments],
            this.logCache,
            this.maxCacheSize
        );
    }

}

module.exports = ServerAppender;
