import { Types, Elements, Events } from "@google-labs/breadboard-ui";
import { createComponent } from "@lit/react";
import React from "react";
import { handleError } from "../lib/errors";

type InputFormProps = Types.InputArgs & Types.BreadboardReactComponentProps;

const BreadboardInputForm = ({
	schema,
	onError,
}: InputFormProps): React.JSX.Element => {
	const LitReactInput = createComponent({
		tagName: "bb-input",
		elementClass: Elements.Input,
		react: React,
		events: {
			onError: Events.InputErrorEvent.eventName,
		},
	});

	return (
		<>
			<LitReactInput
				onError={handleError(onError)}
				configuration={{ schema: schema }}
			/>
		</>
	);
};

export default BreadboardInputForm;
