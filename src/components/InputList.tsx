import { Types, Elements, Events } from "@google-labs/breadboard-ui";
import { createComponent } from "@lit/react";
import React, { useMemo } from "react";
import { handleError } from "../lib/errors";
import { NodeConfiguration, NodeValue } from "@google-labs/breadboard";
import { HarnessRunResult } from "@google-labs/breadboard/harness";
import { BreadboardReactComponentProps } from "src/lib/types";

type InputFormProps = Types.InputArgs & BreadboardReactComponentProps;

type InputDescription = {
	id: string;
	configuration?: NodeConfiguration;
	remember: boolean;
	secret: boolean;
	processedValues: Record<string, NodeValue> | null;
};

const InputList = ({ schema, onError }: InputFormProps): React.JSX.Element => {
	const LitReactInput = createComponent({
		tagName: "bb-input",
		elementClass: Elements.Input,
		react: React,
		events: {
			onError: Events.InputErrorEvent.eventName,
		},
	});

	let messages: HarnessRunResult[] | null;
	let messagePosition = 0;
	let lastUpdate: number;

	const obtainProcessedValuesIfAvailable = (
		id: string,
		idx: number,
		messages: HarnessRunResult[]
	): Record<string, NodeValue> | null => {
		for (let i = idx; i < messagePosition; i++) {
			const message = messages[i];
			if (message.type === "nodeend" && message.data.node.id === id) {
				return message.data.outputs;
			}
		}

		return null;
	};

	const output = useMemo(() => {
		const inputs: InputDescription[] = [];

		if (messages) {
			for (let idx = messagePosition; idx >= 0; idx--) {
				const message = messages[idx];
				if (
					!message ||
					(message.type !== "input" && message.type !== "secret")
				) {
					continue;
				}
				const isMostRecentMessage = idx === messages.length - 1;
				if (message.type === "secret" && isMostRecentMessage) {
					for (const id of message.data.keys) {
						inputs.push({
							id,
							configuration: {
								schema: {
									properties: {
										secret: {
											title: id,
											description: `Enter ${id}`,
											type: "string",
										},
									},
								},
							},
							remember: true,
							secret: true,
							processedValues: null,
						});
					}
					continue;
				}

				if (message.type !== "input") {
					continue;
				}
				const processedValues = obtainProcessedValuesIfAvailable(
					message.data.node.id,
					idx,
					messages
				);

				inputs.push({
					id: message.data.node.id,
					configuration: message.data.inputArguments,
					remember: false,
					secret: false,
					processedValues,
				});
			}
		}

		if (!inputs.length) {
			return <p>There are no inputs yet.</p>;
		}

		inputs.map(
			({ id, secret, remember, configuration, processedValues }, idx) => {
				return (
					<LitReactInput
						id={id}
						secret={secret}
						remember={remember}
						onError={handleError(onError)}
						processedValues={processedValues}
						configuration={configuration}
					/>
				);
			}
		);
	}, []);

	return <>{output}</>;
};

export default InputList;
