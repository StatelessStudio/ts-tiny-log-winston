import * as winston from 'winston';

import { LogSettingsInterface } from 'ts-tiny-log/settings';

/**
 * Settings interface
 */
export interface WinstonLogSettingsInterface extends LogSettingsInterface {
	winston: winston.Logger | Partial<winston.LoggerOptions>;
	winstonOnly?: boolean;
}

/**
 * Default settings
 */
export const defaultWinstonLogSettings: Partial<WinstonLogSettingsInterface> = {
	winston: {
		format: winston.format.simple(),
		levels: winston.config.syslog.levels,
		transports: [new winston.transports.Console()]
	},
	winstonOnly: true,
};
