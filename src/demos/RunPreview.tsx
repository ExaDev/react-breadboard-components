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
import CourseCrafterKit from "./breadboard/kits/CourseCrafterKit";
import XenovaKit from "./breadboard/kits/XenovaKit";
import { ClaudeKitBuilder } from "./breadboard/kits/ClaudeKitBuilder";
import StringKit from "./breadboard/kits/StringKit";
import ConfigKit from "./breadboard/kits/ConfigKit";
import { FeatureKit } from "./breadboard/kits/autobake/featurekit";
import Core from "@google-labs/core-kit";

type BbPreviewRunProps = {
	boardUrl: string;
};

const courseCrafterKits = [
	CourseCrafterKit,
	XenovaKit,
	ClaudeKitBuilder,
	StringKit,
];

const autobakeKits = [ClaudeKitBuilder, StringKit, ConfigKit, Core];

const kitsArray = autobakeKits;

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
		<>
			<h1>Test</h1>
			<section>{uiElement}</section>
			<footer>Made with Breadboard</footer>
		</>
	);
};

export default BbPreviewRun;
