import { Types, Elements } from "@google-labs/breadboard-ui";
import { createComponent } from "@lit/react";
import React, { useState } from "react";
import { handleError } from "../lib/errors";

type BreadboardSchemaEditorProps = Types.InputArgs &
	Types.BreadboardReactComponentProps & {
		editable?: boolean;
	};

const BreadboardSchemaEditor = ({
	schema,
	onError,
	editable = true,
}: BreadboardSchemaEditorProps): React.JSX.Element => {
	const LitReactSchemaEditor = createComponent({
		tagName: "bb-schema-editor",
		elementClass: Elements.SchemaEditor,
		react: React,
	});

	const [schemaString, setSchemaString] = useState<string>(
		JSON.stringify(schema)
	);

	return (
		<>
			<LitReactSchemaEditor //onError={handleError(onError)}
				schema={schema}
				editable={editable}
			/>
			<p>{schemaString}</p>
		</>
	);
};

export default BreadboardSchemaEditor;
