import { HarnessRunResult } from "@google-labs/breadboard/harness";
import JsonTreeWrapper from "src/components/lit-wrappers/BreadboardJsonTree";
import { JSONObject } from "src/lib/types";

type BreadboardErrorProps = {
	result: HarnessRunResult;
};

const BreadboardError = ({
	result,
}: BreadboardErrorProps): React.JSX.Element => {
	const buildErrorElement = (): React.ReactNode => {
		if (result.type === "error") {
			if (typeof result.data.error === "string") {
				return <div className="error">😩{result.data.error}</div>;
			} else {
				return (
					<div className="error">
						😩 Error
						<JsonTreeWrapper json={result.data.error.error as JSONObject} />
					</div>
				);
			}
		}
	};

	return <>{buildErrorElement()}</>;
};

export default BreadboardError;
