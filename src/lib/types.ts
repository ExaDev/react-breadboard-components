import { OutputValues } from "@google-labs/breadboard";
import { Events } from "@google-labs/breadboard-ui";

export type BreadboardElementError = Events.InputErrorEvent; //can be extended later by combining more types e.g., DiagramErrorEvent & EditorErrorEvent etc

export type BreadboardErrorHandler = (error: BreadboardElementError) => void;

export type BreadboardReactComponentProps = {
	onError?: BreadboardErrorHandler;
};

export type JSONObjectValue = number | string | boolean | JSONObject;

export interface JSONObject {
	[key: string]: JSONObjectValue;
}

export type ChunkOutputs = OutputValues & { chunk: string };
