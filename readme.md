Likelog
======

Likelog - The Frontend Logging Framework for JavaScript 

## Size
This library is very lightweight. The minified file has 5.5 KB and can be GZip-compressed to 2 KB.

## Usage

* Install:

`yarn add likelog`

or

`npm install --save likelog`

* Usage:

```javascript
import {Likelog, ConsoleAppender, ServerAppender, LEVELS} from "likelog";

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


```

![](./.github/demo.png)
