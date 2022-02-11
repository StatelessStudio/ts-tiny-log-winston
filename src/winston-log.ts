import * as winston from 'winston';

import { Log as BaseLog } from 'ts-tiny-log';
import { LogEntryInterface } from 'ts-tiny-log/entries';
import { LogLevel } from 'ts-tiny-log/levels';

import { WinstonLogSettingsInterface, defaultWinstonLogSettings } from './settings';
import { formatEntry } from './format-entry';

/**
 * @internal
 *
 * A map of ts-tiny-log level: winston-log level
 */
export const winstonLogLevels = {
	fatal: 'crit',
	error: 'error',
	warn: 'warning',
	info: 'info',
	debug: 'debug',
};

/**
 * ts-tiny-log with tap to winston
 */
export class WinstonLog extends BaseLog {
	protected settings: WinstonLogSettingsInterface;
	protected winstonLogger: winston.Logger;

	public constructor(settings: Partial<WinstonLogSettingsInterface>) {
		super({ ...defaultWinstonLogSettings, ...settings });

		// settings.winston is a Winston Logger instance if it is instantiable
		if ('new' in settings.winston) {
			this.winstonLogger = settings.winston;
		}
		else {
			const options = {
				...defaultWinstonLogSettings.winston,
				...this.settings.winston,
			};

			this.winstonLogger = winston.createLogger(options);
		}
	}

	/**
	 * Log to winston
	 *
	 * @param entry Log entry
	 */
	protected toWinston(entry: LogEntryInterface): void {
		const logLevelName: string = LogLevel[entry.level];
		const winstonLevel: string = winstonLogLevels[logLevelName];

		// Log to winston
		const { message, data } = formatEntry(entry);
		this.winstonLogger.log(winstonLevel, message, data);
	}

	/**
	 * Override and tap log
	 *
	 * @param entry Log entry
	 */
	protected log(entry: LogEntryInterface): void {
		// Log to winston
		this.toWinston(entry);

		// Log to console
		if (!this.settings.winstonOnly) {
			super.log(entry);
		}
	}
}
