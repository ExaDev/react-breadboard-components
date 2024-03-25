import { InputValues, NodeValue, OutputValues } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";

export type HNFirebaseStoryData = OutputValues & {
	id: number;
	apiUrl: string;
	hnUrl: string;
	by: string;
	descendants?: number;
	kids?: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
};

export const HackerNewsFirebaseKit = new KitBuilder({
	url: "npm:@exadev/breadboard-kits/HackerNewsFirebaseKit",
}).build({
	topStoryIds: async (
		inputs: InputValues & { limit?: number }
	): Promise<OutputValues & { storyIds: NodeValue & number[] }> => {
		const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
		const response = await fetch(url);
		const storyIds = (await response.json()) as number[];
		return {
			storyIds: inputs.limit ? storyIds.slice(0, inputs.limit) : storyIds,
		};
	},
	getStoryFromId: async (inputs: InputValues): Promise<HNFirebaseStoryData> => {
		const id: string = <string>inputs.id;
		const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
		// https://news.ycombinator.com/item?id=
		const hnUrl = `https://news.ycombinator.com/item?id=${id}`;
		const response = await fetch(url);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const story = {
			id,
			apiUrl: url,
			hnUrl,
			...(await response.json()),
		};
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return { ...story };
	},
});

export type HackerNewsFirebaseKit = InstanceType<typeof HackerNewsFirebaseKit>;
export default HackerNewsFirebaseKit;
