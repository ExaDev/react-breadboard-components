import { HarnessRunResult } from "@google-labs/breadboard/harness";
import { BreadboardReactComponentProps } from "~/src/lib/types";
import { BreadboardOutputProps } from "./elements/BreadboardOutput";
import { InputFormProps } from "./elements/BreadboardInputForm";

export type BreadboardElementProps = InputFormProps & {
	result: HarnessRunResult;
};

export type BreadboardElement = React.FC<BreadboardElementProps>;
