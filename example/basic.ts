import * as winston from 'winston';
import { WinstonLog } from '../src';

const log: WinstonLog = new WinstonLog({
	winston: {
		format: winston.format.simple(),
		levels: winston.config.syslog.levels,
		transports: [ new winston.transports.Console() ]
	}
});

log.fatal('A fatal message!');
