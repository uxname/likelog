const uuid = require('uuid-random');

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

    try {
        const response = await fetch(url, {
            body: JSON.stringify(tempLogArray),
            method: "POST"
        });

        const res = await response.json();
        if (res.result !== 'ok') {
            console.log('Send logs fail, revert cache: result is not "ok"');
            logCache.logArray = [...tempLogArray, ...logCache.logArray];
        }
    } catch (e) {
        console.log('Send logs fail, revert cache:', e.message);
        logCache.logArray = [...tempLogArray, ...logCache.logArray];
    }
}


class ServerAppender {
    constructor(url, sendInterval = 1000, maxCacheSize = 100000) {
        this.url = url;
        this.logCache = {logArray: []};
        this.showDate = false;
        this.name = null;
        this.customPrefix = null;
        this.maxCacheSize = maxCacheSize;
        this.sendInterval = sendInterval;

        setInterval(async () => {
            // console.log(this.logCache.logArray.length);
            await sendLogs(this.url, this.logCache);
        }, this.sendInterval)
    }

    trace() {
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
