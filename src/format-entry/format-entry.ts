import { LogEntryInterface } from 'ts-tiny-log/entries';

/**
 * Format entry
 *
 * @param entry
 * @returns
 */
export function formatEntry(entry: LogEntryInterface) {
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
