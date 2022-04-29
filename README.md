# ts-tiny-log-winston

## Install

`npm i winston ts-tiny-log ts-tiny-log-winston`

## Setup

### Basic

```typescript
import * as winston from 'winston';
import { WinstonLog } from 'ts-tiny-log-winston';

// Create a winston ts-tiny-log
const log: WinstonLog = new WinstonLog({
	winston: { // Pass winston settings
		format: winston.format.simple(),
		levels: winston.config.syslog.levels,
		transports: [ new winston.transports.Console() ]
	},
	winstonOnly: true, // Optional, pass false to log to both standard and winston
});

log.fatal('A fatal message!');
log.close();
```

### With existing winston instance

If you already have a winston logger instance, you can pass that in instead of logger options:

```typescript
import * as winston from 'winston';
import { WinstonLog } from 'ts-tiny-log-winston';

const winstonLogger = winston.createLogger({
	format: winston.format.simple(),
	levels: winston.config.syslog.levels,
	transports: [ new winston.transports.Console() ]
});

const log: WinstonLog = new WinstonLog({
	winston: winstonLogger
});

log.fatal('A fatal message!');
log.close();

```

### Options

- **winston** Pass a winston Logger instance or winston LoggerOptions
- **winstonOnly** (Optional) Setting this to false will allow ts-tiny-log to log to *both* winston and the normal log channel
