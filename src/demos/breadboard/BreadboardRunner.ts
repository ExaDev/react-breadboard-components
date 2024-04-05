import { InputValues, Kit, NodeStartResponse } from "@google-labs/breadboard";
import { HarnessRunResult, run } from "@google-labs/breadboard/harness";
import { InputResolveRequest } from "@google-labs/breadboard/remote";

type inputCallback = (data: Record<string, unknown>) => void;

export class BreadboardRunner {
	#url: string;
	#kits: Kit[];
	#handlers: Map<string, inputCallback[]> = new Map();
	runResult: HarnessRunResult;

	constructor(url: string, kits: Kit[]) {
		this.#url = url;
		this.#kits = kits;
	}

	public async runBoard() {
		const nodesVisited: Array<{ data: NodeStartResponse }> = [];
		nodesVisited.length = 0;

		const config = { url: this.#url, kits: this.#kits, diagnostics: true };

		for await (const result of run(config)) {
			const answer = await this.#handleRunResult(result);

			if (answer) {
				await result.reply({ inputs: answer } as InputResolveRequest);
			}
			this.runResult = result;
			console.log(this.runResult);
		}
	}

	getRunResult(): HarnessRunResult {
		return this.runResult;
	}

	async #registerInputHandler(id: string): Promise<InputValues> {
		const handlers = this.#handlers.get(id);
		if (!handlers) {
			return Promise.reject(`Unable to set up handler for input ${id}`);
		}

		return new Promise((resolve) => {
			handlers.push((data: Record<string, unknown>) => {
				resolve(data as InputValues);
			});
		});
	}

	async #registerSecretsHandler(keys: string[]): Promise<InputValues> {
		const values = await Promise.all(
			keys.map((key) => {
				return new Promise<[string, unknown]>((resolve) => {
					const callback = ({ secret }: Record<string, unknown>) => {
						resolve([key, secret]);
					};
					this.#handlers.set(key, [callback]);
				});
			})
		);

		return Object.fromEntries(values) as InputValues;
	}

	#handleRunResult(result: HarnessRunResult) {
		const { data, type } = result;
		switch (type) {
			case "nodestart": {
				if (!this.#handlers.has(data.node.id)) {
					this.#handlers.set(data.node.id, []);
				}
				return;
			}
			case "nodeend":
				this.#handlers.delete(data.node.id);
				return;
			case "input":
				return this.#registerInputHandler(data.node.id);
			case "secret":
				return this.#registerSecretsHandler(data.keys);
		}
	}
}
