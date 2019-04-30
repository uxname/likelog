const {Likelog, ConsoleAppender, ServerAppender, Levels} = require('../src');

const log = new Likelog({
    handleAllErrors: true,
    appenders: [
        new ConsoleAppender({
            name: "App",
            customPrefix: 'Console prefix',
            showDate: true,
            showLevels: [Levels.TRACE, Levels.DEBUG, Levels.INFO, Levels.WARN, Levels.ERROR],
        }),
        new ServerAppender({
            url: 'http://localhost:5111/log',
            name: "App",
            customPrefix: `Server prefix`,
            sendInterval: 3000,
            maxCacheSize: 1000,
            muteErrors: true,
            showLevels: [Levels.TRACE, Levels.DEBUG, Levels.INFO, Levels.WARN, Levels.ERROR],
        })
    ]
});

log.trace('Test trace log', {test: 'log_trace'});
log.debug('Test debug log', {test: 'log_debug'});
log.info('Test info log', {test: 'log_info'});
log.warn('Test warn log', {test: 'log_warn'});
log.error('Test error log', {test: 'log_error'});

log.time('testTime');

setInterval(() => {
    log.timeEnd('testTime', Levels.WARN);
    let foo;
    // noinspection JSUnresolvedVariable,BadExpressionStatementJS,JSUnusedAssignment
    foo.bar;
}, 1000);

