import { Types, Elements, Events } from "@google-labs/breadboard-ui";
import { createComponent } from "@lit/react";
import React from "react";
import { JSONObject } from "src/lib/types";

type InputFormProps = {
	json: JSONObject | null | undefined;
};

const JsonTreeWrapper = ({ json }: InputFormProps): React.JSX.Element => {
	const LitJsonTree = createComponent({
		tagName: "bb-json-tree",
		elementClass: Elements.JSONTree,
		react: React,
	});

	return (
		<>
			<LitJsonTree json={json} />
		</>
	);
};

export default JsonTreeWrapper;
