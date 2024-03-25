import { InputValues, NodeValue, OutputValues } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

export function getAbsoluteFilePath(envPath: string = ".env"): string {
	if (!path.isAbsolute(envPath)) {
		envPath = path.join(process.cwd(), envPath);
	}
	return envPath;
}
export type getAbsoluteFilePath = typeof getAbsoluteFilePath;
export async function readEnv(
	inputs: InputValues & { path?: string }
): Promise<OutputValues> {
	if (inputs.path && !fs.existsSync(inputs.path)) {
		throw new Error(
			`Path "${inputs.path}" was explicitly specified but does not exist`
		);
	}

	const envPath = getAbsoluteFilePath(inputs.path || ".env");
	if (fs.existsSync(envPath)) {
		dotenv.config({ path: envPath });
	}
	return Promise.resolve(process.env);
}
export type readEnv = typeof readEnv;

export const ConfigKit = new KitBuilder({
	url: "npm:@exadev/breadboard-kits/kits/ConfigKit",
}).build({
	readEnv,
	readEnvVar: async function (
		inputs: InputValues & { key: string; path?: string }
	): Promise<
		OutputValues & {
			[key: string]: NodeValue;
		}
	> {
		const env = await readEnv(inputs);
		const key = inputs.key;
		const value = env[key];
		if (value === undefined) {
			const absolutePath = getAbsoluteFilePath(inputs.path);
			throw new Error(`"${key}" not found in environment or "${absolutePath}"`);
		}
		return Promise.resolve({ [key]: env[key] });
	},
});
export type ConfigKit = InstanceType<typeof ConfigKit>;
export default ConfigKit;
