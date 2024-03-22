import { asRuntimeKit, Kit, KitConstructor } from "@google-labs/breadboard";

const useBreadboardKits = (kitsArray: KitConstructor<Kit>[]) => {
	const kits = kitsArray.map(
		(kitConstructor) => asRuntimeKit(kitConstructor)
	);
	return kits;
};

export default useBreadboardKits;
