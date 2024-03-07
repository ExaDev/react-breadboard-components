import { Events } from "@google-labs/breadboard-ui";

export type BreadboardElementError = Events.InputErrorEvent &
	Events.InputEnterEvent;

export type BreadboardErrorHandler = (error: BreadboardElementError) => void;
export type BreadboardReactComponentProps = {
	onError?: BreadboardErrorHandler;
};
