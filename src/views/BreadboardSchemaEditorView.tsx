import { Schema } from "@google-labs/breadboard";
import { BreadboardSchemaEditor } from "src/components";

const BreadboardSchemaEditorView = (): React.JSX.Element => {
	const schema = {
		properties: {
			secret: {
				title: "name",
				description: `Enter name`,
				type: "string",
			},
		},
	} as Schema;
	return <BreadboardSchemaEditor schema={schema} />;
};

export default BreadboardSchemaEditorView;
