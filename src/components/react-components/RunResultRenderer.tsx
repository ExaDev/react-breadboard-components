import { InputValues, Schema } from "@google-labs/breadboard";
import { Events } from "@google-labs/breadboard-ui";
import { HarnessRunResult } from "@google-labs/breadboard/harness";
import { useState } from "react";
import BreadboardInputForm from "src/components/lit-wrappers/BreadboardInputForm";
import JsonTreeWrapper from "src/components/lit-wrappers/BreadboardJsonTree";
import { JSONObject } from "src/lib/types";

const RunResultRenderer = () => {
	const [uiElement, setUiElement] = useState<React.ReactNode>();
	//const [showContinueButton, setShowContinueButton] = useState(false);

	const renderOutput = (output: Record<string, unknown>) => {
		const schema = output.schema as Schema;
		if (!schema || !schema.properties) {
			return <JsonTreeWrapper json={output as JSONObject} />;
		}

		return (
			<>
				{Object.entries(schema.properties).map(([property, schema]) => {
					const value = output[property] as string;

					return (
						<>
							<section className="output-item">
								<h1 title={schema.title || "Undescribed property"}>
									{schema.title || "Untitled property"}
								</h1>
								<div>{value || "No value"}</div>
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
				//setShowContinueButton(true);

				const secrets: React.ReactNode[] = [];
				setUiElement(secrets);

				const values = await Promise.all(
					result.data.keys.map((key) => {
						return new Promise<[string, string]>(() => {
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
				//setShowContinueButton(true);
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
		//setShowContinueButton(false);
	};

	return handleStateChange;
}

export default RunResultRenderer; 