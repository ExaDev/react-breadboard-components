import "./App.css";
import DevPulsePreviewRunner from "./demos/RunPreview";

function App() {
	return (
		<>
			<div className="card">
				<DevPulsePreviewRunner boardUrl="/graphs/auto-bake.json" />
			</div>
		</>
	);
}

export default App;
