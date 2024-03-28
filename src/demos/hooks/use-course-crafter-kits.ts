import { Kit } from "@google-labs/breadboard";
import { ClaudeKitBuilder } from "../breadboard/kits/ClaudeKitBuilder";
import StringKit from "../breadboard/kits/StringKit";
import useBreadboardKits from "./use-breadboard-kits";
import CourseCrafterKit from "../breadboard/kits/CourseCrafterKit";
import XenovaKit from "../breadboard/kits/XenovaKit";
import ConfigKit from "../breadboard/kits/ConfigKit";

const useCourseCrafterKits = (): Kit[] => {
	const courseCrafterKits = [
		CourseCrafterKit,
		XenovaKit,
		ClaudeKitBuilder,
		StringKit,
		ConfigKit,
	];

	const kitsToUse = useBreadboardKits(courseCrafterKits);

	return kitsToUse;
};

export default useCourseCrafterKits;
