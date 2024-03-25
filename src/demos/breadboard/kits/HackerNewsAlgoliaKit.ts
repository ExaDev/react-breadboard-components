import { InputValues, OutputValues } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";

export type PostItem = {
	author: string;
	created_at: string;
	created_at_i: number;
	id: number;
	children: Comment[];
	story_id: number;
	type: string;
};

export type Comment = PostItem & {
	parent_id: number;
	text: string;
	title: null;
};

export type Story = PostItem & {
	title: string;
	points: number;
	url: string;
};

export type HackerNewsAlgoliaSearchTags =
	| "story"
	| "comment"
	| "poll"
	| "pollopt"
	| "show_hn"
	| "ask_hn"
	| "front_page";
export type NumericFilterField = "created_at_i" | "points" | "num_comments";
export type Operator = "<" | "<=" | "=" | ">" | ">=";

export type HackerNewsSearchNumericFilters = {
	operator: Operator;
	field: NumericFilterField;
	value: number;
};
export type HackerNewAlgoliaSearchParameters = {
	query: string;
	tags?: HackerNewsAlgoliaSearchTags[];
	numericFilters?: HackerNewsSearchNumericFilters[];
	page?: number;
	limit?: number;
};

export type SearchHits = OutputValues & {
	hits: PostItem[];
};

export async function search(
	inputs: InputValues & HackerNewAlgoliaSearchParameters
): Promise<SearchHits> {
	const { query, tags, numericFilters, page } = inputs;
	const url = new URL("https://hn.algolia.com/api/v1/search");
	url.searchParams.set("query", query);
	if (tags) {
		url.searchParams.set("tags", tags.join(","));
	}
	if (numericFilters) {
		url.searchParams.set(
			"numericFilters",
			numericFilters
				.map((filter) => {
					return `${filter.field}${filter.operator}${filter.value}`;
				})
				.join(",")
		);
	}
	if (page) {
		url.searchParams.set("page", page.toString());
	}
	const response = await fetch(url.href);
	const { hits } = (await response.json()) as unknown as {
		hits: PostItem[];
	};
	return Promise.resolve({
		algoliaUrl: url.href,
		hits: inputs.limit ? hits.slice(0, inputs.limit) : hits,
	});
}

export const HackerNewsAlgoliaKit = new KitBuilder({
	url: "npm:@exadev/breadboard-kits/HackerNewsAlgoliaKit",
}).build({
	async getStory(inputs: InputValues): Promise<OutputValues & Story> {
		const id: string = inputs.id as string;
		const url = `https://hn.algolia.com/api/v1/items/${id}`;
		// return {url}
		const response = await fetch(url);
		const story: Story = (await response.json()) as unknown as Story;
		return Promise.resolve({
			algoliaUrl: url,
			...story,
		});
	},
	search,
});

export type HackerNewsAlgoliaKit = InstanceType<typeof HackerNewsAlgoliaKit>;
export default HackerNewsAlgoliaKit;
