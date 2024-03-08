import { Board, GraphDescriptor } from "@google-labs/breadboard";
import { Types } from "@google-labs/breadboard-ui";

type BreadboardUIControllerProps = {};

export const getBoardInfo = async (url: string): Promise<Types.LoadArgs> => {
	const runner = await Board.load({ url: "/graphs/blank.json" });

	const { title, description, version } = runner;
	const diagram = runner.mermaid("TD", true, true);
	const nodes = runner.nodes;
	const graphDescriptor: GraphDescriptor = runner;

	return { title, description, version, diagram, url, graphDescriptor, nodes };
};

const BreadboardUIController =
	({}: BreadboardUIControllerProps): React.JSX.Element => {
		//Have a board config in here
		//Config comes from local json config file (e.g., blank.json)
		//Extract schema from the config
		//Pass schema to Input element
		return <div>UI controller</div>;
	};

export default BreadboardUIController;
