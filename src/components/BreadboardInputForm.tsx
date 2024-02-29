import { Types, Elements } from "@google-labs/breadboard-ui";
import { createComponent } from "@lit/react";
import React from "react";
import { handleError } from "../lib/errors";
import "./style.css";

type InputFormProps = Types.InputArgs & Types.BreadboardReactComponentProps;

const InputForm = ({ schema, onError }: InputFormProps): React.JSX.Element => {
	const LitReactInput = createComponent({
		tagName: "bb-input",
		elementClass: Elements.Input,
		react: React,
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

export default InputForm;
