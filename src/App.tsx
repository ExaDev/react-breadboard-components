import { useState } from "react";
import "./App.css";
import BbPreviewRun from "./components/react-components/BbPreviewRun";

function App() {
	const [preview, setPreview] = useState(false);

	const jsonObj = {
		type: "output",
		configuration: {
			schema: {
				type: "object",
				properties: {
					text: {
						type: "string",
						title: "text",
					},
				},
			},
		},
	};

	return (
		<>
			<div className="card">
				<button onClick={() => setPreview(true)}>Show Embedded Board</button>
				{preview && (
					<>
						<BbPreviewRun output={jsonObj} />
					</>
				)}
			</div>
		</>
	);
}

export default App;
