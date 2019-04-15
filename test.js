const {Likelog, ConsoleAppender, ServerAppender, LEVELS} = require('./index');

const log = new Likelog({
    appenders: [new ConsoleAppender(), new ServerAppender('http://localhost:5111/log', 3000, 1000)],
    name: "App",
    customPrefix: `Console prefix`,
    showDate: true,
    showLevels: [LEVELS.TRACE, LEVELS.DEBUG, LEVELS.INFO, LEVELS.WARN, LEVELS.ERROR],
});

log.trace('Test trace log', {test: 'log_trace'});
log.debug('Test debug log', {test: 'log_debug'});
log.info('Test info log', {test: 'log_info'});
log.warn('Test warn log', {test: 'log_warn'});
log.error('Test error log', {test: 'log_error'});

setInterval(() => {
    log.warn('WORKS');
}, 200);
