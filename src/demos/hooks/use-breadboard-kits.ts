import { Kit, KitConstructor, asRuntimeKit } from "@google-labs/breadboard";

const useBreadboardKits = (kitsList: KitConstructor<Kit>[]) => {
	const kits = kitsList.map((kitConstructor) => asRuntimeKit(kitConstructor));
	return kits;
};

export default useBreadboardKits;
