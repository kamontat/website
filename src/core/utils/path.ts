import type {
	LocaleName,
	StaticPathsBuilder,
	StaticPathsFunction,
	OptionalPaths,
} from "@core/types";
import { utilsLogger } from "@core/constants/logger";
import { getLocales, hasLocale } from "./locale";

const executeBuilder = async <Input, Output>(
	input: Input,
	builder: Output | StaticPathsBuilder<Input, Output>,
): Promise<Output> => {
	return typeof builder === "function"
		? await (builder as StaticPathsBuilder<Input, Output>)(input)
		: builder;
};

interface BuilderInput {
	index: number;
	locale: LocaleName;
}

export const getStaticPathsWithLocale = <Parameters, Props>(
	params?: Parameters | StaticPathsBuilder<BuilderInput, Parameters>,
	props: Props | StaticPathsBuilder<BuilderInput, Props> = {} as Props,
): StaticPathsFunction<Parameters, Props> => {
	const logger = utilsLogger.extend(getStaticPathsWithLocale.name);

	logger.debug("initiate StaticPaths function");
	return async () => {
		const result = await Promise.all(
			getLocales().map(async (locale, index) => {
				const input: BuilderInput = { locale, index };
				const _params = await executeBuilder(input, params);
				const _props = await executeBuilder(input, props);

				logger.debug("%d) built params: %o", index, _params);
				logger.debug("%d) built props: %o", index, _props);

				return {
					params: { ...(_params as Parameters), locale },
					props: _props,
				};
			}),
		);

		return result;
	};
};

export const getRawPath = (pathname: string) => {
	const logger = utilsLogger.extend(getRawPath.name);
	const paths = pathname.split("/");

	if (!hasLocale(pathname)) {
		logger.debug(`input "%s" doesn't contains locale, returned`, pathname);
		return pathname;
	}

	const isRoot = paths.at(0) === "";

	const index = isRoot ? 2 : 1;
	const _output = paths.slice(index).join("/");
	const output = isRoot ? `/${_output}` : _output;

	logger.debug(`transform input "%s" to "%s"`, pathname, output);
	return output;
};

export const buildPath = (...paths: OptionalPaths): string => {
	const logger = utilsLogger.extend(buildPath.name);
	logger.debug(`input paths: "%s"`, paths);

	// remove '/' prefix and suffix
	const path = paths
		.map((path) => path?.replace(/(^\/|\/$)/g, ""))
		.filter((path) => typeof path === "string")
		.join("/");
	logger.debug(`after remove prefix and suffix: "%s"`, path);

	return path;
};
