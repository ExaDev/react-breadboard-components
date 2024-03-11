import { asRuntimeKit } from "@google-labs/breadboard";
import Core from "@google-labs/core-kit";
import JSONKit from "@google-labs/json-kit";
import TemplateKit from "@google-labs/template-kit";
import PaLMKit from "@google-labs/palm-kit";
import GeminiKit from "@google-labs/gemini-kit";
import AgentKit from "@google-labs/agent-kit";

const useBreadboardKits = () => {
	const kits = [TemplateKit, Core, PaLMKit, GeminiKit, JSONKit, AgentKit].map(
		(kitConstructor) => asRuntimeKit(kitConstructor)
	);
	return kits;
};

export default useBreadboardKits;
