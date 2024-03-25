import { InputValues, NodeValue, OutputValues } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";
import {
	BifurcatedList,
	ListIndexInput,
	ListInput,
	ListItemInput,
	ListOperationOutput,
	ListOutput,
	ListSpliceInput,
	ListSpliceOutput,
	SplitInput,
	SplitOutput,
} from "./types/list";

export type EmptyObject = Record<string, never>;

export const ListKit = new KitBuilder({
	url: "npm:@exadev/breadboard-kits/list",
}).build({
	/**
	 * Combines lists together
	 * This method returns a and b combined as a new array
	 * @param inputs a set of lists or values to be concatenated into a new array
	 * @returns a new array containing the combined values of the lists
	 */
	async concat(inputs: InputValues): Promise<Awaited<{ list: NodeValue }>> {
		const list: NodeValue[] = [];
		for (const input of Object.values(inputs)) {
			if (Array.isArray(input)) {
				list.push(...input);
			} else {
				list.push(input);
			}
		}
		return Promise.resolve({ list });
	},
	/**
	 * Slices a list into two sections.
	 * This method returns two list.
	 * @param inputs.list the list to be split
	 * @param inputs.index the beginning index of the specified portion of the list
	 */
	async bifurcate(inputs: InputValues): Promise<BifurcatedList> {
		const { list, index }: ListIndexInput = inputs as ListIndexInput;
		return Promise.resolve({
			before: list.slice(0, index),
			after: list.slice(index),
		});
	},
	/**
	 * Appends a new element to the end of a list.
	 * This method returns the modified list with the new element.
	 * @param inputs.list the list to append a new element to
	 * @param inputs.item the element to be appended to the list
	 *
	 */
	async push(inputs: InputValues): Promise<ListInput> {
		const { list, item }: ListItemInput = inputs as ListItemInput;
		list.push(item);
		return Promise.resolve({ list });
	},
	/**
	 * Removes the first element in the list.
	 * This method returns the modified list and the removed element.
	 * @param inputs.list the list the last element will be removed from.
	 */
	async shift(inputs: InputValues): Promise<ListOperationOutput> {
		const { list }: ListInput = inputs as ListInput;
		const item: NodeValue = list.shift();
		return Promise.resolve({ item, list });
	},
	/**
	 * Removes the last element in a list.
	 * This method returns the modified list and the removed element.
	 * @param inputs.list list the list the last element will be removed from.
	 */
	async pop(inputs: InputValues): Promise<
		OutputValues &
			(
				| EmptyObject
				| {
						item: NodeValue;
						list: NodeValue[];
				  }
			)
	> {
		if (
			!inputs.list ||
			!Array.isArray(inputs.list) ||
			(Array.isArray(inputs.list) && inputs.list.length == 0)
		) {
			return {};
		}
		const list: NodeValue[] = inputs.list as NodeValue[];
		const item: NodeValue = list.pop();
		return Promise.resolve({ item, list });
	},
	/**
	 * Appends a new element at the start of the list
	 * This method returns the modified list with the new element.
	 * @param inputs.list the list the new element will be added to.
	 * @param inputs.item the element to appended to the list.
	 */
	async unshift(inputs: InputValues): Promise<ListOutput> {
		const { list, item }: ListItemInput = inputs as ListItemInput;
		list.unshift(item);
		return Promise.resolve({ list });
	},
	/**
	 * Removes elements from a list. If provided, replaces removed elements with new elements in their place.
	 * This method returns a list with the rmodified list which has removed or replaced elements.
	 * @param inputs.list the list to be modified
	 * @param inputs.start the index of array from which to start removing elements.
	 * @param inputs.count the number of elements to remove.
	 * @param inputs.items the elements to replace the removed elements.
	 *
	 */
	async splice(inputs: InputValues): Promise<ListSpliceOutput> {
		const { list, start, count, items }: ListSpliceInput =
			inputs as ListSpliceInput;
		const extracted: NodeValue[] = list.splice(start, count, ...(items ?? []));
		return Promise.resolve({ extracted, list });
	},
	/**
	 * Splits a string into substrings using the specified delimiter.
	 * This method returns a list containing substrings of the original string.
	 * @param inputs.input the string to split
	 * @param inputs.delimiter the separator to split a string by
	 * @param inputs.split_by_each flag which splits substrings into their individual characters
	 * @param inputs.remove_empty_text flag whichs removes empty strings
	 * @param inputs.trim_items flag which removes leading and trailing whitespace and line terminator characters
	 * @param inputs.keep_delimiters flag which returns the substrings including the separator
	 * @param inputs.output_format the format of the result
	 * @returns
	 */
	async split(inputs: SplitInput): Promise<SplitOutput> {
		const {
			input,
			delimiter,
			split_by_each,
			remove_empty_text,
			trim_items,
			keep_delimiters,
			output_format = "string_array",
		}: SplitInput = inputs;
		let values: (string | { text: string; delimiter: string })[];

		if (delimiter.regex != null) {
			// if it's a regex string, convert back to RegEx
			// have to do this because nodeValues does not support RegEx Type
			const myRegex = new RegExp(delimiter.regex);
			values = input.split(myRegex);

			if (keep_delimiters) {
				// original regex might have kept delimiters, so just check if that's the case
				if (input != values.join("")) {
					// if delimiters have been removed, positive lookbehind can be used to keep them when splitting
					const new_regex = new RegExp(`(?<=${delimiter.regex})`);
					values = input.split(new_regex);
				}
			}
		} else {
			values = input.split(delimiter.delimiter);
		}

		if (split_by_each) {
			values = values.map((text: string) => text.split("")).flat();
		}

		if (remove_empty_text) {
			values = values.filter((text: string) => text.length > 0);
		}
		if (trim_items) {
			values = values.map((text: string) => text.trim());
		}

		if (keep_delimiters && delimiter.delimiter != null) {
			// remove last element, because it wouldn't have had a delimiter
			const tmp = values.slice(0, -1);
			const removed = values[values.length - 1];
			// for all other elements, append the original delimiter back
			values = tmp.map((text: string) => text.concat(delimiter.delimiter));
			values.push(removed);
		}

		if (output_format === "string_array") {
			return { values: values as string[] };
		}
		return Promise.resolve({
			values: values as { text: string; delimiter: string }[],
		});
	},
});

export type ListKit = InstanceType<typeof ListKit>;
export default ListKit;
