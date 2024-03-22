import { Schema } from "@google-labs/breadboard";
import { BreadboardInputForm } from "src/components";

const BreadboardInputView = (): React.JSX.Element => {
	const schema = {
		properties: {
			secret: {
				title: "name",
				description: `Enter name`,
				type: "string",
			},
		},
	} as Schema;
	return <BreadboardInputForm schema={schema} />;
};

export default BreadboardInputView;
