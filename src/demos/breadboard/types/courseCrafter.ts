import {NodeValue} from "@google-labs/breadboard";
import { List } from "./list.js";


export type blog = {
	url: NodeValue;
	title: NodeValue;
	blog: NodeValue;
}

export type blogOutput = NodeValue;

export type blogList = {
	blogOutput: NodeValue[];
};


export type getBlogsHTMLContentInput = List;

export type getBlogsContentForTaskOutput =  blogList;

