import { Types, Elements, Events } from "@google-labs/breadboard-ui";
import { createComponent } from "@lit/react";
import React from "react";
import { BreadboardReactComponentProps } from "src/lib/types";

type InputFormProps = Types.InputArgs &
	BreadboardReactComponentProps & {
		secret?: boolean;
		remember?: boolean;
		onSubmit?: (event: Events.InputEnterEvent) => void;
	};

const BreadboardInputForm = ({
	schema,
	//onError,
	secret,
	remember,
	onSubmit,
}: InputFormProps): React.JSX.Element => {
	const LitReactInput = createComponent({
		tagName: "bb-input",
		elementClass: Elements.Input,
		react: React,
		events: {
			//onError: Events.InputErrorEvent.eventName,
			onSubmit: Events.InputEnterEvent.eventName,
		},
	});

	return (
		<>
			<LitReactInput
				//onError={handleError(onError)}
				secret={secret}
				remember={remember}
				schema={schema}
				onSubmit={onSubmit}
			/>
		</>
	);
};

export default BreadboardInputForm;
