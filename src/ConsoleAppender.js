const tools = require('./tools');
const {Levels} = require('./Consts');

const TERMINAL_BG_COLOR_TRACE = '\x1b[97m\x1b[104m%s \x1b[0m\x1b[34m';
const TERMINAL_BG_COLOR_DEBUG = '\x1b[97m\x1b[42m%s \x1b[0m\x1b[32m';
const TERMINAL_BG_COLOR_INFO = '\x1b[97m\x1b[45m%s \x1b[0m\x1b[95m';
const TERMINAL_BG_COLOR_WARN = '\x1b[97m\x1b[43m%s \x1b[0m\x1b[33m';
const TERMINAL_BG_COLOR_ERROR = '\x1b[97m\x1b[41m%s \x1b[0m\x1b[91m';

function generatePrefix(level, name, customPrefix, showDate) {
    return `${showDate ? '[' + tools.formatDate(new Date()) + '] ' : ''}[${level.toUpperCase()}]${name ? ' [' + name + ']' : ''}${customPrefix ? ' [' + customPrefix + ']' : ''}`;
}

class ConsoleAppender {
    constructor(config = {}) {
        this.showDate = config.showDate || false;
        this.name = config.name || null;
        this.customPrefix = config.customPrefix || null;
        this.showDate = config.showDate || false;
        this.showLevels = config.showLevels || [Levels.TRACE, Levels.DEBUG, Levels.INFO, Levels.WARN, Levels.ERROR];
    }

    trace() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.TRACE)) return;
        const prefix = generatePrefix('trace', this.name, this.customPrefix, this.showDate);
        if (tools.isBrowser()) {
            return console.log(
                '%c' + prefix,
                'background: #3399ff; color: #FFFFFF',
                ...arguments
            );
        } else {
            return console.log(
                TERMINAL_BG_COLOR_TRACE,
                prefix,
                ...arguments
            );
        }
    }

    debug() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.DEBUG)) return;
        const prefix = generatePrefix('debug', this.name, this.customPrefix, this.showDate);
        if (tools.isBrowser()) {
            return console.log(
                '%c' + prefix,
                'background: #00ff99; color: #000000',
                ...arguments
            );
        } else {
            return console.log(
                TERMINAL_BG_COLOR_DEBUG,
                prefix,
                ...arguments
            );
        }
    }

    info() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.INFO)) return;
        const prefix = generatePrefix('info', this.name, this.customPrefix, this.showDate);
        if (tools.isBrowser()) {
            return console.log(
                '%c' + prefix,
                'background: #ffff00; color: #000000',
                ...arguments
            );
        } else {
            return console.log(
                TERMINAL_BG_COLOR_INFO,
                prefix,
                ...arguments
            );
        }
    }

    warn() {
        if (this.showLevels) if (!this.showLevels.includes(Levels.WARN)) return;
        const prefix = generatePrefix('warn', this.name, this.customPrefix, this.showDate);
        if (tools.isBrowser()) {
            return console.log(
                '%c' + prefix,
                'background: #ff9900; color: #000000',
                ...arguments
            );
        } else {
            return console.log(
                TERMINAL_BG_COLOR_WARN,
                prefix,
                ...arguments
            );
        }
    }

    error() {
        if (this.showLevels && !this.showLevels.includes(Levels.ERROR)) return;
        const prefix = generatePrefix('error', this.name, this.customPrefix, this.showDate);
        if (tools.isBrowser()) {
            return console.log(
                '%c' + prefix,
                'background: #cc0000; color: #FFFFFF',
                ...arguments
            );
        } else {
            return console.log(
                TERMINAL_BG_COLOR_ERROR,
                prefix,
                ...arguments
            );
        }
    }
}

module.exports = ConsoleAppender;
