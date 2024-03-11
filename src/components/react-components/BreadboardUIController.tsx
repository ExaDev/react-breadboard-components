import BbPreviewRun from "./BbPreviewRun";

type BreadboardUIControllerProps = {};

const BreadboardUIController =
	({}: BreadboardUIControllerProps): React.JSX.Element => {
		return <BbPreviewRun boardUrl="/graphs/blank.json" />;
	};

export default BreadboardUIController;
