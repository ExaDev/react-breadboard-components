import { JSONObjectValue } from "src/lib/types";

const useCreatePreview = (value: JSONObjectValue) => {
	if (Array.isArray(value)) {
		return value.length > 0 ? "[...]" : "[]";
	}

	if (typeof value === "object") {
		return Object.keys(value).length > 0 ? "{...}" : "{}";
	}

	return value;
};

const useFormatValue = (value: JSONObjectValue) => {
	if (typeof value === "string") {
		return `"${value}"`;
	}

	return value;
};

export { useCreatePreview, useFormatValue };
