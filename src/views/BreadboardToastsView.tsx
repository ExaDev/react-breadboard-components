import { useState } from "react";
import { Events } from "@google-labs/breadboard-ui";
import { BreadboardToast } from "src/components";

const BreadboardToastsView = (): React.JSX.Element => {
	const [infoToast, setInfoToast] = useState(false);
	const [errorToast, setErrorToast] = useState(false);
	const [warningToast, setWarningToast] = useState(false);

	return (
		<>
			<div className="card">
				<button id="toast-info" onClick={() => setInfoToast(true)}>
					Show Info Toast
				</button>
				{infoToast && (
					<>
						<BreadboardToast
							toastMessage="Information"
							type={Events.ToastType.INFORMATION}
						/>
					</>
				)}
				<button id="toast-error" onClick={() => setErrorToast(true)}>
					Show Error Toast
				</button>
				{errorToast && (
					<>
						<BreadboardToast
							toastMessage="Error"
							type={Events.ToastType.INFORMATION}
						/>
					</>
				)}
				<button id="toast-warning" onClick={() => setWarningToast(true)}>
					Show Warning Toast
				</button>
				{warningToast && (
					<>
						<BreadboardToast
							toastMessage="Warning"
							type={Events.ToastType.INFORMATION}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default BreadboardToastsView;
