import { InputValues, NodeValue, OutputValues } from "@google-labs/breadboard";

export type List = {
	list: NodeValue[];
};

export type Item = {
	item: NodeValue;
};

export type Index = {
	index: number;
};

export type ListOperationOutput = OutputValues & List & Item;

export type ListInput = InputValues & List;

export type ListOutput = OutputValues & List;

export type BifurcatedList = OutputValues & {
	before: NodeValue[];
	after: NodeValue[];
};

export type ListIndexInput = InputValues & List & Index;

export type ListItemInput = InputValues & List & Item;

export type ListSpliceInput = InputValues &
	List & {
		start: number;
		count: number;
		items?: NodeValue[];
	};

export type ListSpliceOutput = OutputValues &
	List & {
		extracted: NodeValue[];
	};

// only allow a delimeter OR a regex (has to be string) because nodeValue doesn't allow RegEx types
export type splitDelimiter =
	| { delimiter: string; regex?: never }
	| { regex: string; delimiter?: never };

export type SplitInput = InputValues & {
	input: string;
	delimiter: splitDelimiter;
	split_by_each: boolean; // split_by_each - [ OPTIONAL - TRUE by default ] - Whether or not to divide text around each character contained in delimiter.
	remove_empty_text: boolean; // [ OPTIONAL - TRUE by default ] - Whether or not to remove empty text messages from the split results. The default behavior is to treat consecutive delimiters as one (if TRUE). If FALSE, empty cells values are added between consecutive delimiters.
	trim_items: boolean; // [ OPTIONAL - FALSE by default ] - Whether or not to trim each item in the split results.
	keep_delimiters: boolean; // [ OPTIONAL - FALSE by default ] - Whether or not to include the delimiter in the split results.
	// output as either a list of strings or list of objects with text and delimiter
	output_format?: "string_array" | "object_array";
};

export type SplitOutput = OutputValues & {
	values: (
		| {
				text: string;
				delimiter: string;
		  }
		| string
	)[];
};
