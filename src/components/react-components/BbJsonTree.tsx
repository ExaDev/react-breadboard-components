import { JSONObject } from "src/lib/types";
import { useCreatePreview, useFormatValue } from "src/hooks/breadboard-hooks";

type BbJsonTreeProps = {
	json: JSONObject;
};

const BbJsonTree = ({ json }: BbJsonTreeProps): React.JSX.Element => {
	const generateComponent = (obj: JSONObject) => {
		const entries = Object.entries(obj);
		if (entries.length === 0) {
			if (Array.isArray(obj)) {
				return <div className="empty">length: 0</div>;
			}

			return <div className="empty">No JSON provided</div>;
		}

		return entries.map(([key, value]) => {
			const type = typeof value;
			const preview = useCreatePreview(value);
			if (type === "object") {
				return (
					<details open>
						<summary>
							<span className="key">{key}: </span>
							<span className="preview">{preview}</span>
						</summary>
						{generateComponent(value as JSONObject)}
					</details>
				);
			}

			return (
				<div className={type}>
					<span className="key">{key}: </span>
					{useFormatValue(value).toString()}
				</div>
			);
		});
	};

	return (
		<>
			<div id="top-level">{generateComponent(json)}</div>
			{/* <button id="copy-to-clipboard" title="Copy JSON to Clipboard">
				Copy
			</button> */}
		</>
	);
};

export default BbJsonTree;
