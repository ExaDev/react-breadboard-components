import { InputValues, NodeValue, OutputValues } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";

export const ObjectKit = new KitBuilder({
	url: "npm:@exadev/breadboard-kits/kits/ObjectKit",
}).build({
	pick: async (
		inputs: InputValues & {
			object: Record<string, NodeValue>;
			key: string;
		}
	): Promise<
		OutputValues & {
			value: NodeValue;
			rest: Record<string, NodeValue>;
		}
	> => {
		const { object, key } = inputs;
		const { [key]: value, ...rest } = object;

		return Promise.resolve({
			value,
			rest,
		});
	},
	pickSeveral: async (
		inputs: InputValues & {
			object: Record<string, NodeValue>;
			keys: string[];
		}
	): Promise<
		OutputValues & {
			rest: Record<string, NodeValue>;
		}
	> => {
		// let {object, keys}: InputValues & { object: Record<string, NodeValue>; keys: string[] } = inputs;
		let object = inputs.object;
		const keys = inputs.keys;
		const values = {};
		for (const key of keys) {
			const { [key]: value, ...rest } = object;
			values[key] = value;
			object = rest;
		}
		return Promise.resolve({
			...values,
			rest: object,
		});
	},
	spread: async (
		inputs: InputValues & {
			object: Record<string, NodeValue>;
		}
	): Promise<OutputValues & { [key: string]: NodeValue }> => {
		return Promise.resolve({
			...inputs.object,
		});
	},
	nest: async (
		inputs: InputValues & {
			key: string;
		}
	): Promise<OutputValues> => {
		// get all values from inputs except inputs.key
		const { key, ...rest } = inputs;
		return Promise.resolve({
			[key]: rest,
		});
	},
	limitDepth: async (
		inputs: InputValues & {
			object: Record<string, NodeValue>;
			depth: number;
		}
	): Promise<OutputValues & { object: Record<string, NodeValue> }> => {
		const { object, depth } = inputs;
		return Promise.resolve({
			object: limitDepth(object, depth),
		});
	},
});

// Wrapper function to limit the depth of an object
export function limitDepth(obj: AnyObject, maxDepth: number): AnyObject {
	const currentDepth = calculateDepth(obj);
	if (currentDepth > maxDepth) {
		return reduceDepth(obj, maxDepth);
	}
	return obj; // Return the object as is if it's within the depth limit
} // Function to reduce the depth of an object
function reduceDepth(obj: AnyObject, maxDepth: number): AnyObject {
	function reduce(obj: AnyObject, currentDepth: number): AnyObject {
		if (currentDepth === maxDepth) {
			return Array.isArray(obj) ? [] : {};
		}

		const result: AnyObject = Array.isArray(obj) ? [] : {};

		for (const key in obj) {
			if (typeof obj[key] === "object" && obj[key] !== null) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				result[key] = reduce(obj[key], currentDepth + 1);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				result[key] = obj[key];
			}
		}

		return result;
	}

	return reduce(obj, 0);
}

function calculateDepth(obj: AnyObject, currentDepth: number = 0): number {
	if (typeof obj !== "object" || obj === null) {
		return currentDepth;
	}

	let maxDepth = currentDepth;
	for (const key in obj) {
		if (typeof obj[key] === "object" && obj[key] !== null) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const depth = calculateDepth(obj[key], currentDepth + 1);
			if (depth > maxDepth) {
				maxDepth = depth;
			}
		}
	}

	return maxDepth;
}
//////////////////////////////////////////////////
export interface AnyObject {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export type ObjectKit = InstanceType<typeof ObjectKit>;
export default ObjectKit;
