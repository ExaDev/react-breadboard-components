import { InputValues, Kit } from "@google-labs/breadboard";
import { HarnessRunResult } from "@google-labs/breadboard/harness";
import React from "react";

type BreadboardProviderProps = {
	url: string;
	kits: Kit[];
	handleStateChange: (result: HarnessRunResult) => Promise<void | InputValues>;
};

const BreadboardProvider = ({
	url,
	kits,
	handleStateChange,
}: BreadboardProviderProps): React.JSX.Element => <></>;

export default BreadboardProvider;
