/**
 * Format an argument
 *
 * @param data
 * @returns
 */
export function formatArgument(data) {
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
