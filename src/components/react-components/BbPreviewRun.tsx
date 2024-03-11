import {
	InputValues,
	Kit,
	NodeStartResponse,
	Schema,
	StreamCapabilityType,
	asRuntimeKit,
	clone,
} from "@google-labs/breadboard";
import "./BbPreviewRun.css";
import { ChunkOutputs, JSONObject } from "src/lib/types";
import JsonTreeWrapper from "../lit-wrappers/JsonTreeWrapper";
import { HarnessRunResult, run } from "@google-labs/breadboard/harness";
import BreadboardInputForm from "../lit-wrappers/BreadboardInputForm";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { Events } from "@google-labs/breadboard-ui";
import useBreadboardKits from "src/hooks/use-breadboard-kits";
import runBoard from "src/hooks/run-board";

type BbPreviewRunProps = {
	boardUrl: string;
};

const BbPreviewRun = ({ boardUrl }: BbPreviewRunProps): React.JSX.Element => {
	const kits = useBreadboardKits();
	const [uiElement, setUiElement] = useState<React.ReactNode>();
	const [showContinueButton, setShowContinueButton] = useState(false);

	useEffect(() => {
		if (boardUrl) {
			runBoard(boardUrl, kits, handleStateChange);
		}
	}, []);

	const renderOutput = (output: Record<string, unknown>) => {
		const schema = output.schema as Schema;
		if (!schema || !schema.properties) {
			return <JsonTreeWrapper json={output as JSONObject} />;
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
										const outputs = chunk as ChunkOutputs;
										value += outputs.chunk;
									},
								})
							)
							.then(() => value);
					} else {
						valueTmpl =
							typeof value === "object" ? (
								<JsonTreeWrapper json={value as JSONObject} />
							) : (
								value
							);
					}

					return (
						<>
							<section className="output-item">
								<h1 title={schema.description || "Undescribed property"}>
									{schema.title || "Untitled property"}
								</h1>
							</section>
							<section>{uiElement}</section>
						</>
					);
				})}
			</>
		);
	};

	const handleStateChange = async (
		result: HarnessRunResult
	): Promise<void | InputValues> => {
		switch (result.type) {
			case "secret": {
				setShowContinueButton(true);

				const secrets: React.ReactNode[] = [];
				setUiElement(secrets);

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

				setUiElement(null);
				return Object.fromEntries(values);
			}

			case "input":
				setShowContinueButton(true);
				return new Promise((resolve) => {
					setUiElement(
						<BreadboardInputForm
							schema={result.data.inputArguments.schema}
							onSubmit={(event: Events.InputEnterEvent) => {
								setUiElement(null);
								resolve(event.data as InputValues);
							}}
						/>
					);
				});

			case "error":
				if (typeof result.data.error === "string") {
					setUiElement(<div className="error">😩 ${result.data.error}</div>);
				} else {
					setUiElement(
						<div className="error">
							😩 Error
							<JsonTreeWrapper json={result.data.error.error as JSONObject} />
						</div>
					);
				}
				return Promise.resolve(void 0);

			case "output":
				setUiElement(renderOutput(result.data.outputs));
				return Promise.resolve(void 0);
		}
	};

	const continueButton = showContinueButton ? (
		<button className="continue" onClick={() => console.log("submitted")}>
			Continue
		</button>
	) : null;

	return (
		<>
			<h1>Test</h1>
			<section>
				{uiElement}
				{continueButton}
			</section>
			<footer>Made with Breadboard</footer>
		</>
	);
};

export default BbPreviewRun;
