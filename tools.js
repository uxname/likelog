function formatDate(date) {
    return date.toISOString().replace('Z', '').replace('T', ' ');
}

function generatePrefix(level, name, customPrefix) {
    return `%c${this.showDate ? '[' + formatDate(new Date()) + '] ' : ''}[${level.toUpperCase()}]${name ? ' [' + name + ']' : ''}${customPrefix ? ' [' + customPrefix + ']' : ''}`;
}


module.exports = {
    formatDate: formatDate,
    generatePrefix: generatePrefix
};
