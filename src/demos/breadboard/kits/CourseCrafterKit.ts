/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { KitBuilder } from "@google-labs/breadboard/kits";
import { InputValues, NodeValue, OutputValues } from "@google-labs/breadboard";
import {
	getBlogsContentForTaskOutput,
	getBlogsHTMLContentInput,
	blogOutput,
	blog,
} from "../types/courseCrafter.js";
import { List } from "../types/list.js";
import { TransformerTask } from "../types/xenova.js";
import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Web scraper which extracts text from a website, this is used to extract blog post text
 * will currently only work for blog posts on: https://developer.chrome.com/
 * @param url the url of the website
 * @returns contents of the website
 */
async function getBlogContent(url: string): Promise<blog> {
	const axiosInstance = axios.create();

	const response = await axiosInstance.get(url);
	const selector = cheerio.load(response.data);
	console.log(`Extracting Content from: ${url}`);
	const title: NodeValue = selector(".devsite-page-title").text();
	// if this stops returning content, inspect css, the class names might have changed
	const blog: NodeValue = selector(".devsite-article-body").text();
	console.log(blog);
	return Promise.resolve({ url, title, blog } as blog);
}

// WIP testing to generalize web scraping that doesn't return on certain tags to extract data
// this will need to be re-visited when we want to extract from blogs with different structures
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getBlogContentTest(url: string): Promise<blog> {
	const axiosInstance = axios.create();
	const response = await axiosInstance.get(url, {
		headers: {
			"Accept-Encoding": "application/json",
		},
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const selector = cheerio.load(response.data);
	const blog = selector("body").html();
	const title = "title";

	return Promise.resolve({ url, title, blog });
}

export const CourseCrafterKit = new KitBuilder({
	url: "npm@exadev/breadboard-kits/CourseCrafter",
}).build({
	async getContent(
		input: InputValues & {
			url: string;
		}
	): Promise<blog> {
		const { url }: InputValues = input;
		return getBlogContent(url);
	},

	async getBlogContentForTask(
		inputs: InputValues & {
			url?: string;
			model?: string;
			task?: TransformerTask;
		}
	): Promise<OutputValues> {
		const { url, model, task }: InputValues = inputs;

		const response = await getBlogContent(url);
		return { blogContent: response["blog"], model, task };
	},
	/**
	 * Web scraper which extracts text from the list of urls
	 * @param input a list of urls of blogs to extract
	 * @returns a list containing blog contents
	 */
	async getBlogsContent(input: List): Promise<getBlogsContentForTaskOutput> {
		const { list }: getBlogsHTMLContentInput = input;
		const blogOutput: blogOutput[] = [];

		for (const url of list) {
			const response = await getBlogContent(url as string);
			blogOutput.push(response["blog"]);
		}

		return Promise.resolve({ blogOutput });
	},

	// unused atm, experimental for web scraping without knowing the structure of the blog
	// the idea would be to grab the HTML, feed to LLM to infer which tag holds the blog content, so we can dynamically
	// extract from blogs of different structures
	async getBlogHTMLForTask(
		inputs: InputValues & {
			url?: string;
			model?: string;
			task?: TransformerTask;
		}
	): Promise<OutputValues> {
		const { url, model, task }: InputValues = inputs;

		const response = await getBlogContentTest(url);
		return { blogContent: response["blog"], model, task };
	},
});

export type CourseCrafterKit = InstanceType<typeof CourseCrafterKit>;
export default CourseCrafterKit;
