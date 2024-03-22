import BbPreviewRun from "src/components/react-components/BbPreviewRun";
import "./App.css";

function App() {
	return (
		<>
			<div className="card">
				<BbPreviewRun boardUrl="/graphs/course-crafter-single.json" />
			</div>
		</>
	);
}

export default App;
