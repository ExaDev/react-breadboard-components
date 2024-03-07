import { BreadboardElementError, BreadboardErrorHandler } from "./types";

export const handleError = (onError?: BreadboardErrorHandler) => (e: Event) => {
	if (onError) {
		return onError(e as BreadboardElementError);
	}
	console.error(`There was an error.`, e);
};
