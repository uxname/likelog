function formatDate(date) {
    return date.toISOString().replace('Z', '').replace('T', ' ');
}

function generatePrefix(level, name, customPrefix, showDate) {
    return `%c${showDate ? '[' + formatDate(new Date()) + '] ' : ''}[${level.toUpperCase()}]${name ? ' [' + name + ']' : ''}${customPrefix ? ' [' + customPrefix + ']' : ''}`;
}


module.exports = {
    formatDate: formatDate,
    generatePrefix: generatePrefix
};
