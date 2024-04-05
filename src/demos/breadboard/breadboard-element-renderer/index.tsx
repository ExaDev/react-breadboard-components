import React from "react";
import { breadboardElementMap, ElementName } from "./breadboard-element-map";
import { BreadboardElementProps } from "./types";

type Props = {
	elementName: ElementName;
} & BreadboardElementProps;
const BreadboardElementRenderer = ({
	elementName,
	...breadboardElementProps
}: Props): React.JSX.Element => {
	const BreadboardElement = breadboardElementMap[elementName];
	return (
		<React.Suspense>
			<BreadboardElement {...breadboardElementProps} />
		</React.Suspense>
	);
};

export default BreadboardElementRenderer;
