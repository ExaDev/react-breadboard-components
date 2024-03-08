import {
	InputValues,
	Kit,
	NodeStartResponse,
	Schema,
	StreamCapabilityType,
	clone,
} from "@google-labs/breadboard";
import "./BbPreviewRun.css";
import BbJsonTree from "./BbJsonTree";
import { ChunkOutputs, JSONObject } from "src/lib/types";
import JsonTreeWrapper from "../lit-wrappers/JsonTreeWrapper";
import { HarnessRunResult, run } from "@google-labs/breadboard/harness";
import { getBoardInfo } from "node_modules/@google-labs/breadboard-web/build/preview-run";
import { BreadboardInputForm } from "..";

type BbPreviewRunProps = {
	output: JSONObject;
};

const BbPreviewRun = ({ output }: BbPreviewRunProps): React.JSX.Element => {
	const handleStateChange = async (
		result: HarnessRunResult
	): Promise<void | InputValues> => {
		let uiElement;
		let showContinueButton = false;
		switch (result.type) {
			case "secret": {
				showContinueButton = true;

				// Set up a placeholder for the secrets.
				const secrets = [];
				uiElement = "secrets";

				// By setting the uiElement above we have requested a render, but before
				// that we step through each secret and create inputs. We await each
				// input that we create here.
				const values = await Promise.all(
					result.data.keys.map((key) => {
						return new Promise<[string, string]>((secretResolve) => {
							const id = key;
							const configuration = {
								schema: {
									properties: {
										secret: {
											title: id,
											description: `Enter ${id}`,
											type: "string",
										},
									},
								},
							};

							const secret = (
								<BreadboardInputForm
									secret={true}
									remember={true}
									schema={configuration.schema}
								/>
							);
							secrets.push(secret);
						});
					})
				);

				// Once all the secrets are resolved we can remove the UI element and
				// return the secrets.
				uiElement = null;

				return Object.fromEntries(values);
			}

			case "input":
				showContinueButton = true;

				return new Promise((resolve) => {
					uiElement = (
						<BreadboardInputForm schema={result.data.inputArguments.schema} />
					);
				});

			case "error":
				if (typeof result.data.error === "string") {
					uiElement = <div className="error">😩 ${result.data.error}</div>;
				} else {
					uiElement = (
						<div className="error">
							😩 Error
							<JsonTreeWrapper json={result.data.error.error as JSONObject} />
						</div>
					);
				}
				return Promise.resolve(void 0);
		}
	};

	const runBoard = async (url: string, kits: Kit[]) => {
		const nodesVisited: Array<{ data: NodeStartResponse }> = [];
		nodesVisited.length = 0;

		const config = { url, kits: kits, diagnostics: true };

		const boardInfo = await getBoardInfo(url);

		for await (const result of run(config)) {
			const answer = await handleStateChange(result);

			if (answer) {
				await result.reply({ inputs: answer });
			}
		}
	};

	const generateComponent = () => {
		const schema = output.schema as Schema;
		if (!schema || !schema.properties) {
			return <JsonTreeWrapper json={output}></JsonTreeWrapper>;
		}

		return (
			<>
				{Object.entries(schema.properties).map(([property, schema]) => {
					const value = output[property];
					let valueTmpl;
					if (schema.format === "stream") {
						let value = "";
						const streamedValue = clone(
							output[property] as unknown as StreamCapabilityType
						)
							.pipeTo(
								new WritableStream({
									write(chunk) {
										// For now, presume that the chunk is an `OutputValues` object
										// and the relevant item is keyed as `chunk`.
										const outputs = chunk as ChunkOutputs;
										value += outputs.chunk;
									},
								})
							)
							.then(() => value);
					} else {
						valueTmpl =
							typeof value === "object" ? (
								<BbJsonTree json={value as JSONObject}></BbJsonTree>
							) : (
								value
							);
					}

					return (
						<section className="output-item">
							<h1 title={schema.description || "Undescribed property"}>
								{schema.title || "Untitled property"}
							</h1>
						</section>
					);
				})}
			</>
		);
	};

	return <>{generateComponent()}</>;
};

export default BbPreviewRun;
