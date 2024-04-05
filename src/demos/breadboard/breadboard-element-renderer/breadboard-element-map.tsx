import { lazy, LazyExoticComponent } from "react";
import { BreadboardElement } from "./types";

export const breadboardElementMap: Record<
	string,
	LazyExoticComponent<BreadboardElement>
> = {
	secret: lazy(() => import("./elements/BreadboardSecretInput")),
	input: lazy(() => import("./elements/BreadboardInputForm")),
	error: lazy(() => import("./elements/BreadboardError")),
	//output: lazy(() => import("./elements/BreadboardOutput")),
};

export type ElementName = keyof typeof breadboardElementMap;
