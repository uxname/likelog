const {UXLogger, ConsoleAppender, ServerAppender, LEVELS} = require('./index');

const log = new UXLogger({
    appenders: [new ConsoleAppender(), new ServerAppender('http://localhost:5111/log', 500, 10)],
    name: "App",
    customPrefix: `Console prefix`,
    showDate: false,
    showLevels: [LEVELS.TRACE, LEVELS.DEBUG, LEVELS.INFO, LEVELS.WARN, LEVELS.ERROR],
});

log.trace('asd', {kek: 'lol'});
log.debug('asd', {kek: 'lol'});
log.info('asd', {kek: 'lol'});
log.warn('asd', {kek: 'lol'});
log.error('asd', {kek: 'lol'});

console.log('suka');

setInterval(() => {
    log.warn('FUCK');
}, 20);
