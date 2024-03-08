import { createComponent } from "@lit/react";
import React from "react";
import { Events, Elements } from "@google-labs/breadboard-ui";

type ToastProps = {
	toastMessage: string;
	type?: Events.ToastType;
};

const BreadboardToast = ({
	toastMessage,
	type = Events.ToastType.INFORMATION,
}: ToastProps): React.JSX.Element => {
	const LitReactToast = createComponent({
		tagName: "bb-toast",
		elementClass: Elements.Toast,
		react: React,
		events: {
			onclick: "connectedCallback",
			onerror: "error",
		},
	});

	const handleError = (e: Event) => {
		console.log(e);
	};

	return (
		<LitReactToast onerror={handleError} type={type} message={toastMessage} />
	);
};

export default BreadboardToast;
