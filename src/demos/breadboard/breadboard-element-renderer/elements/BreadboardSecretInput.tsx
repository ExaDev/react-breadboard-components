import { HarnessRunResult } from "@google-labs/breadboard/harness";
import BreadboardInputForm from "~/src/demos/breadboard/breadboard-element-renderer/elements/BreadboardInputForm";

export type BreadboardSecretInputProps = {
	result: HarnessRunResult;
};

const BreadboardSecretInput = ({
	result,
}: BreadboardSecretInputProps): React.JSX.Element => {
	const buildSecretInput = (): React.ReactNode => {
		if (result.type === "secret") {
			const secrets: React.ReactNode[] = [];
			result.data.keys.map((key) => {
				const id = key;
				const configuration = {
					schema: {
						properties: {
							secret: {
								title: id,
								description: `Enter ${id}`,
								type: "string",
							},
						},
					},
				};

				const secret = (
					<BreadboardInputForm
						secret={true}
						remember={true}
						schema={configuration.schema}
					/>
				);
				secrets.push(secret);
			});
			secrets.push(null);
			return secrets.map((secret) => secret);
		}
	};

	return <>{buildSecretInput()}</>;
};

export default BreadboardSecretInput;
