import { useEffect, useState } from "react";
import "./RunPreview.css";
import useDevPulseKits from "./hooks/use-dev-pulse-kits";
import { BreadboardRunner } from "./breadboard/BreadboardRunner";
import BreadboardElementRenderer from "./breadboard/breadboard-element-renderer";
import { HarnessRunResult } from "@google-labs/breadboard/harness";
import HackerNewsAlgoliaKit from "./breadboard/kits/HackerNewsAlgoliaKit";

type BbPreviewRunProps = {
	boardUrl?: string;
};

const BbPreviewRun = ({
	boardUrl = "/graphs/dev-pulse.json",
}: BbPreviewRunProps): React.JSX.Element => {
	const kits = useDevPulseKits();
	const runner = new BreadboardRunner(boardUrl, kits);
	let runResult: HarnessRunResult = {} as HarnessRunResult;
	useEffect(() => {
		if (boardUrl) {
			runner.runBoard().then((r) => {
				runResult = runner.getRunResult();
			});
		}
		// runResult = runner.getRunResult();
	}, [runResult]);

	console.log(runResult);

	return (
		<main>
			<section className="samplesRunnerContainer">
				<h4>ExaDev Samples</h4>
				<section>
					<BreadboardElementRenderer result={runResult} elementName="input" />
				</section>
			</section>
			<footer>Made with Breadboard</footer>
		</main>
	);
};

export default BbPreviewRun;
