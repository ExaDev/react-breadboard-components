import "./App.css";
import DevPulsePreviewRunner from "./demos/RunPreview";

function App() {
	return (
		<>
			<div className="card">
				<DevPulsePreviewRunner boardUrl="/graphs/dev-pulse.json" />
			</div>
		</>
	);
}

export default App;
