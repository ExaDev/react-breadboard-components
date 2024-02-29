import { useState } from "react";
import "./App.css";
import BreadboardInputView from "./views/BreadboardInputView";

function App() {
	const [preview, setPreview] = useState(false);

	return (
		<>
			<div className="card">
				<button onClick={() => setPreview(true)}>Show Embedded Board</button>
				{preview && (
					<>
						<BreadboardInputView />
					</>
				)}
			</div>
		</>
	);
}

export default App;
