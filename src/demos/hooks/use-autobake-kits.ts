import { Kit } from "@google-labs/breadboard";
import StringKit from "../breadboard/kits/StringKit";
import useBreadboardKits from "./use-breadboard-kits";
import ConfigKit from "../breadboard/kits/ConfigKit";
import ObjectKit from "../breadboard/kits/ObjectKit";
import { ClaudeKitBuilder } from "../breadboard/kits/ClaudeKitBuilder";
import FeatureKit from "../breadboard/kits/autobake/featurekit";

const useAutobakeKits = (): Kit[] => {
	const autobakeKits = [
		FeatureKit,
		ClaudeKitBuilder,
		StringKit,
		ConfigKit,
		ObjectKit,
	];

	const kitsToUse = useBreadboardKits(autobakeKits);

	return kitsToUse;
};

export default useAutobakeKits;
