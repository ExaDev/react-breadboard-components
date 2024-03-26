import { InputValues } from "@google-labs/breadboard";
import { HarnessRunResult } from "@google-labs/breadboard/harness";
import { useEffect, useState } from "react";
import { Events } from "@google-labs/breadboard-ui";
import BreadboardOutput from "src/components/react-components/BreadboardOutput";
import BreadboardError from "src/components/react-components/BreadboardError";
import BreadboardSecretInput from "src/components/react-components/BreadboardSecretInput";
import useBreadboardKits from "./hooks/use-breadboard-kits";
import { BreadboardInputForm } from "~/src/components";
import runBoard from "./breadboard/board-runner";
import { ClaudeKitBuilder } from "./breadboard/kits/ClaudeKitBuilder";
import StringKit from "./breadboard/kits/StringKit";
import HackerNewsAlgoliaKit from "./breadboard/kits/HackerNewsAlgoliaKit";
import HackerNewsFirebaseKit from "./breadboard/kits/HackerNewsFirebaseKit";
import JsonKit from "./breadboard/kits/JsonKit";
import ListKit from "./breadboard/kits/ListKit";
import Core from "@google-labs/core-kit";
import ObjectKit from "./breadboard/kits/ObjectKit";
import "./RunPreview.css";

type BbPreviewRunProps = {
	boardUrl: string;
};

const devPulseKits = [
	HackerNewsAlgoliaKit,
	HackerNewsFirebaseKit,
	JsonKit,
	ListKit,
	ObjectKit,
	StringKit,
	Core,
	ClaudeKitBuilder,
];

const kitsArray = devPulseKits;

const BbPreviewRun = ({ boardUrl }: BbPreviewRunProps): React.JSX.Element => {
	const kits = useBreadboardKits(kitsArray);
	const [uiElement, setUiElement] = useState<React.ReactNode>();

	const handleStateChange = async (
		result: HarnessRunResult
	): Promise<void | InputValues> => {
		switch (result.type) {
			case "secret": {
				setUiElement(<BreadboardSecretInput result={result} />);
				return Promise.resolve(void 0);
			}

			case "input":
				console.log(result.data.inputArguments.schema);
				return new Promise((resolve) => {
					setUiElement(
						<BreadboardInputForm
							schema={result.data.inputArguments.schema}
							onSubmit={(event: Events.InputEnterEvent) => {
								setUiElement(null);
								resolve(event.data as InputValues);
							}}
						/>
					);
				});

			case "error":
				setUiElement(<BreadboardError result={result} />);
				return Promise.resolve(void 0);

			case "output":
				setUiElement(
					<BreadboardOutput
						output={result.data.outputs}
						uiElement={uiElement}
					/>
				);
				return Promise.resolve(void 0);
		}
	};

	useEffect(() => {
		if (boardUrl) {
			runBoard(boardUrl, kits, handleStateChange);
		}
	}, []);

	return (
		<main>
			<section className="samplesRunnerContainer">
				<h4>ExaDev Samples</h4>
				<section>{uiElement}</section>
			</section>
			<footer>Made with Breadboard</footer>
		</main>
	);
};

export default BbPreviewRun;
