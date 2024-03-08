import { Types, Elements, Events } from "@google-labs/breadboard-ui";
import { createComponent } from "@lit/react";
import React from "react";
import { handleError } from "src/lib/errors";

type InputFormProps = Types.InputArgs &
	Types.BreadboardReactComponentProps & {
		secret?: boolean;
		remember?: boolean;
	};

const BreadboardInputForm = ({
	schema,
	onError,
	secret,
	remember,
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
				secret={secret}
				remember={remember}
				configuration={{ schema: schema }}
			/>
		</>
	);
};

export default BreadboardInputForm;
