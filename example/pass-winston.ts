import * as winston from 'winston';
import { WinstonLog } from '../src';

const winstonLogger = winston.createLogger({
	format: winston.format.simple(),
	levels: winston.config.syslog.levels,
	transports: [ new winston.transports.Console() ]
});

const log: WinstonLog = new WinstonLog({
	winston: winstonLogger
});

log.fatal('A fatal message!');
