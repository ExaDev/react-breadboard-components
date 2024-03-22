import { InputValues } from "@google-labs/breadboard";
import "./BbPreviewRun.css";
import { HarnessRunResult } from "@google-labs/breadboard/harness";
import BreadboardInputForm from "../lit-wrappers/BreadboardInputForm";
import { useEffect, useState } from "react";
import { Events } from "@google-labs/breadboard-ui";
import useBreadboardKits from "src/hooks/use-breadboard-kits";
import runBoard from "src/hooks/run-board";
import Core from "@google-labs/core-kit";
import JSONKit from "@google-labs/json-kit";
import TemplateKit from "@google-labs/template-kit";
import PaLMKit from "@google-labs/palm-kit";
import GeminiKit from "@google-labs/gemini-kit";
import AgentKit from "@google-labs/agent-kit";
import BreadboardOutput from "src/components/react-components/BreadboardOutput";
import BreadboardError from "src/components/react-components/BreadboardError";
import BreadboardSecretInput from "src/components/react-components/BreadboardSecretInput";

type BbPreviewRunProps = {
	boardUrl: string;
};

const kitsArray = [Core, JSONKit, TemplateKit, PaLMKit, GeminiKit, AgentKit];

const BbPreviewRun = ({ boardUrl }: BbPreviewRunProps): React.JSX.Element => {
	const kits = useBreadboardKits(kitsArray);
	const [uiElement, setUiElement] = useState<React.ReactNode>();
	//const [showContinueButton, setShowContinueButton] = useState(false);

	const handleStateChange = async (
		result: HarnessRunResult
	): Promise<void | InputValues> => {
		switch (result.type) {
			case "secret": {
				//setShowContinueButton(true);
				setUiElement(<BreadboardSecretInput result={result} />)
				return Promise.resolve(void 0)
			}

			case "input":
				//setShowContinueButton(true);
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
				setUiElement(<BreadboardError result={result} />)
				return Promise.resolve(void 0);

			case "output":
				setUiElement(<BreadboardOutput output={result.data.outputs} uiElement={uiElement} />);
				return Promise.resolve(void 0);
		}
		//setShowContinueButton(false);
	};

	useEffect(() => {
		if (boardUrl) {
			runBoard(boardUrl, kits, handleStateChange);
		}
	}, []);

	/* const continueButton = showContinueButton ? (
		<button className="continue" onClick={() => console.log("submitted")}>
			Continue
		</button>
	) : null; */

	return (
		<>
			<h1>Test</h1>
			<section>
				{uiElement}
				{/*continueButton*/}
			</section>
			<footer>Made with Breadboard</footer>
		</>
	);
};

export default BbPreviewRun;
