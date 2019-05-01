function formatDate(date) {
    return date.toISOString().replace('Z', '').replace('T', ' ');
}

function isBrowser() {
    return typeof window !== 'undefined'
}

module.exports = {
    formatDate: formatDate,
    isBrowser: isBrowser,
};

