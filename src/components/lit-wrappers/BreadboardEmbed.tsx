import { createComponent } from "@lit/react";
import React from "react";
import { Embed } from "@google-labs/breadboard-web/embed.js";
import background from "/images/pattern.png";

const BreadboardEmbed = (): React.JSX.Element => {
	const LitReactEmbed = createComponent({
		tagName: "bb-embed",
		elementClass: Embed,
		react: React,
		events: {},
	});

	return (
		<LitReactEmbed
			style={{ backgroundImage: `url(${background})`, marginTop: "3em" }}
			url="/graphs/blank.json"
		/>
	);
};

//get react-error-boundary
export default BreadboardEmbed;
