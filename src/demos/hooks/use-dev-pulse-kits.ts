import { Kit } from "@google-labs/breadboard";
import { ClaudeKitBuilder } from "../breadboard/kits/ClaudeKitBuilder";
import HackerNewsAlgoliaKit from "../breadboard/kits/HackerNewsAlgoliaKit";
import HackerNewsFirebaseKit from "../breadboard/kits/HackerNewsFirebaseKit";
import JsonKit from "../breadboard/kits/JsonKit";
import ListKit from "../breadboard/kits/ListKit";
import ObjectKit from "../breadboard/kits/ObjectKit";
import StringKit from "../breadboard/kits/StringKit";
import Core from "@google-labs/core-kit";
import useBreadboardKits from "./use-breadboard-kits";

const useDevPulseKits = (): Kit[] => {
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

	const kitsToUse = useBreadboardKits(devPulseKits);

	return kitsToUse;
};

export default useDevPulseKits;
