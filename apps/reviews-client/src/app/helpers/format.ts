import _isNil from 'lodash/isNil';

const dateFormat = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

export const getDate = (
	date: Date | string | null,
	options?: Intl.DateTimeFormatOptions,
): string => {
	if (!date) {
		return '';
	}

	const d: Date = typeof date === 'string' ? new Date(date) : date;

	return formatDate(d, options);
};

/**
 * Formates a date
 *
 * @param date - The date
 * @param [options] - The format options.
 * @returns The formatted date
 */
export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
	const _dateFormat = _isNil(options) ? dateFormat : new Intl.DateTimeFormat('en-US', options);

	return _dateFormat.format(date);
};
