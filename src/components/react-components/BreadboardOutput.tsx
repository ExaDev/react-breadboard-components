import { Schema } from "@google-labs/breadboard";
import JsonTreeWrapper from "src/components/lit-wrappers/BreadboardJsonTree";
import { JSONObject } from "src/lib/types";

type BreadboardOutputProps = {
	output: Record<string, unknown>;
	uiElement: React.ReactNode;
};

const BreadboardOutput = ({
	output,
	uiElement,
}: BreadboardOutputProps): React.JSX.Element => {
	const schema = output.schema as Schema;
	if (!schema || !schema.properties) {
		return <JsonTreeWrapper json={output as JSONObject} />;
	}

	return (
		<>
			{Object.entries(schema.properties).map(([property, schema]) => {
				const value = output[property] as string;

				return (
					<>
						<section className="output-item">
							<h4 title={schema.title || "Undescribed property"}>
								{schema.title || "Untitled property"}
							</h4>
							<div>{value || "No value"}</div>
						</section>
						<section>{uiElement}</section>
					</>
				);
			})}
		</>
	);
};

export default BreadboardOutput;
