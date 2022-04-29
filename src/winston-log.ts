import * as winston from 'winston';

import { Log as BaseLog } from 'ts-tiny-log';
import { LogEntryInterface } from 'ts-tiny-log/entries';
import { LogLevel } from 'ts-tiny-log/levels';

import { WinstonLogSettingsInterface, defaultWinstonLogSettings } from './settings';

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

export interface FormattedEntryInterface {
	message?: string;
	data?: any | any[];
}

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
	 * Format an entry argument
	 *
	 * @param data
	 * @returns
	 */
	protected formatArgument(data) {
		const type = typeof data;

		if (Array.isArray(data)) {
			return { array: data };
		}
		else if (data instanceof Error) {
			return {
				message: data.message,
				name: data.name,
				stack: data.stack,
			};
		}
		else if (typeof data !== 'object') {
			return { [type]: data };
		}
		else {
			return data;
		}
	}
	/**
	 * Format entry
	 *
	 * @param entry
	 * @returns
	 */
	protected formatEntry(entry: LogEntryInterface) {
		let message = '';
		let data: any = [].concat(entry.data);

		// Check if there is a message argument in the entry
		if (
			entry.data &&
			entry.data.length &&
			typeof entry.data[0] === 'string'
		) {
			// Use the argument as the message and remove it from the data
			message += data[0];
			data.splice(0, 1);
		}

		if (data.length > 1) {
			data = data.map(this.formatArgument);
			data = { arguments: data };
		}
		else if (data.length === 1) {
			data = this.formatArgument(data[0]);
		}
		else {
			data = '';
		}

		return { message, data };
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
		const { message, data } = this.formatEntry(entry);
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

	/**
	 * Close the log connection
	 */
	protected close(): void {
		if (this.winstonLogger?.close) {
			this.winstonLogger.close();
		}
	}
}
