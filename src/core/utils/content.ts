import { defaultLocale } from "@core/constants/locale";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = Record<string, any>;

export type LocaleContent<
	Data extends AnyData,
	Key extends keyof Data,
	Locale extends keyof Data[Key] | undefined,
> = Locale extends keyof Data[Key] ? Data[Key][Locale] : Data[Key];

/**
 * get value from input data (with localized support).
 * @private This function is NOT type self, please use CollectionEntry or SingletonEntry instead
 *
 * @param data - data mapping
 * @param key - key of the data
 * @param locale - localised key of output value
 * @returns value content from data mapping if existed or undefined if not found
 *
 * @see {@link mustContent}
 */
export const getContent = <
	Data extends AnyData,
	Key extends keyof Data = keyof Data,
	Locale extends keyof Data[Key] | undefined = undefined,
>(
	data: Data,
	key: Key,
	locale?: Locale,
): LocaleContent<Data, Key, Locale> | undefined => {
	const _value = data[key];
	if (_value === undefined || _value === null) return undefined;

	if (!locale) return _value;
	return _value[locale] ?? _value[defaultLocale];
};

/**
 * get value from input data (with localized support).
 * @private This function is NOT type self, please use CollectionEntry or SingletonEntry instead
 *
 * @param data - data mapping
 * @param key - key of the data
 * @param locale - localised key of output value
 * @returns value content from data mapping
 * @throws Error when cannot find localised content (if provides) or content key
 *
 * @see {@link getContent}
 */
export const mustContent = <
	Data extends AnyData,
	Key extends keyof Data = keyof Data,
	Locale extends keyof Data[Key] | undefined = undefined,
>(
	data: Data,
	key: Key,
	locale?: Locale,
): LocaleContent<Data, Key, Locale> => {
	const _value = data[key];
	if (_value === undefined || _value === null) {
		const _key = String(key);
		const msg = `Cannot find data: key=${_key}`;
		throw new Error(msg);
	}

	if (!locale) return _value;

	// fallback to default locale if not exist
	const value = _value[locale] ?? _value[defaultLocale];
	if (_value === undefined || _value === null) {
		const [_locale, _key] = [String(locale), String(key)];
		const msg = `Cannot find localised data: locale=${_locale}, key=${_key}`;
		throw new Error(msg);
	}

	return value;
};
