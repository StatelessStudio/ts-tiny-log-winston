import 'jasmine';
import { WinstonLog } from '../../src';
import * as winston from 'winston';

class TestWinstonLog extends WinstonLog {
	public winstonLogger: winston.Logger;
}

const settings = {
	winston: {
		format: winston.format.simple(),
		levels: winston.config.syslog.levels,
		transports: [new winston.transports.Console()]
	}
};

describe('WinstonLog', () => {
	it('can create a winston logger from options', () => {
		const log: TestWinstonLog = new TestWinstonLog({
			winston: settings.winston
		});

		expect(log.winstonLogger.info).toBeDefined();
	});

	it('can create a winston logger from an existing logger', () => {
		const logger = winston.createLogger(settings.winston);
		const log: TestWinstonLog = new TestWinstonLog({
			winston: logger
		});

		expect(log.winstonLogger.info).toBeDefined();
	});
});
