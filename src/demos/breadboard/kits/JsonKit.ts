import { InputValues, NodeValue, OutputValues } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";

export const JsonKit = new KitBuilder({
	url: "npm:@exadev/breadboard-kits/kits/JsonKit",
}).build({
	stringify: async (
		inputs: InputValues & { object: string; }
	): Promise<OutputValues> => {
		// TODO: refactor to spread all params similar to StringKit template
		const { object } = inputs;
		return Promise.resolve({
			string: JSON.stringify(object),
		});
	},
	parse: async (
		inputs: InputValues & { string: string; }
	): Promise<OutputValues> => {
		const { string } = inputs;
		return Promise.resolve(JSON.parse(string) as Record<string, NodeValue>);
	},
});

export type JsonKit = InstanceType<typeof JsonKit>;
export default JsonKit;
