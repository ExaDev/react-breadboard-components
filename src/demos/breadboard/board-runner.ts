import { InputValues, Kit, NodeStartResponse } from "@google-labs/breadboard";
import { HarnessRunResult, run } from "@google-labs/breadboard/harness";

export const runBoard = async (
	url: string,
	kits: Kit[],
	handleRunResult: (result: HarnessRunResult) => Promise<void | InputValues>
) => {
	const nodesVisited: Array<{ data: NodeStartResponse }> = [];
	nodesVisited.length = 0;

	const config = { url, kits: kits, diagnostics: true };

	for await (const result of run(config)) {
		const answer = await handleRunResult(result);

		if (answer) {
			await result.reply({ inputs: answer });
		}
	}
};
