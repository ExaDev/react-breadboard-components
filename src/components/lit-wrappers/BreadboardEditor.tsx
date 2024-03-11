import { Elements, Events } from "@google-labs/breadboard-ui";
import { createComponent } from "@lit/react";
import React from "react";

type BreadboardEditorProps = {};

const BreadboardEditor = ({}: BreadboardEditorProps): React.JSX.Element => {
	const LitEditor = createComponent({
		tagName: "bb-editor",
		elementClass: Elements.Editor,
		react: React,
		events: {
			onGraphNodeSelected: Events.GraphNodeSelectedEvent.eventName,
		},
	});

	return (
		<>
			<LitEditor />
		</>
	);
};

export default BreadboardEditor;
