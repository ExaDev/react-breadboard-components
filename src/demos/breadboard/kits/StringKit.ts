import { InputValues } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";

export function parametersFromTemplate(template: string): string[] {
	const matches = template.matchAll(/{{(?<name>[\w-]+)}}/g);
	const parameters = Array.from(matches).map(
		(match) => match.groups?.name || ""
	);
	return Array.from(new Set(parameters));
}

export const stringify = (value: unknown): string => {
	if (typeof value === "string") return value;
	if (value === undefined) return "undefined";
	return JSON.stringify(value, null, 2);
};

export function substitute(template: string, values: InputValues) {
	return Object.entries(values).reduce(
		(acc, [key, value]) => acc.replace(`{{${key}}}`, stringify(value)),
		template
	);
}

export const StringKit = new KitBuilder({
	url: "npm:@exadev/breadboard-kits/kits/StringKit",
}).build({
	// replicated from https://github.com/google/labs-prototypes/blob/82e3061d26a69f1557b21e7a7f40dd7f56f1bdb6/seeds/llm-starter/src/nodes/prompt-template.ts#L45-L61
	async concat(inputs: { strings: string[] }): Promise<{ string: string }> {
		const { strings } = inputs;
		return Promise.resolve({
			string: strings.join(""),
		});
	},
	async template(inputs: InputValues & { template: string }) {
		const template = inputs.template;
		const parameters = parametersFromTemplate(template);

		if (!parameters.length) return { string: template };

		const substitutes = parameters.reduce((acc, parameter) => {
			if (inputs[parameter] === undefined)
				throw new Error(`Input is missing parameter "${parameter}"`);
			return { ...acc, [parameter]: inputs[parameter] };
		}, {});

		const string = substitute(template, substitutes);

		return Promise.resolve({ string });
	},
});

export type StringKit = InstanceType<typeof StringKit>;
export default StringKit;
