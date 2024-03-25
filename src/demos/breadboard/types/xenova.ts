import { NodeValue } from "@google-labs/breadboard";

export const TransformerTask = {
	textClassification: "text-classification",
	tokenClassification: "token-classification",
	questionAnswering: "question-answering",
	fillMask: "fill-mask",
	summarization: "summarization",
	translation: "translation",
	text2textGeneration: "text2text-generation",
	textGeneration: "text-generation",
	zeroShotClassification: "zero-shot-classification",
	audioClassification: "audio-classification",
	automaticSpeechRecognition: "automatic-speech-recognition",
	textToAudio: "text-to-audio",
	imageToText: "image-to-text",
	imageClassification: "image-classification",
	imageSegmentation: "image-segmentation",
	zeroShotImageClassification: "zero-shot-image-classification",
	objectDetection: "object-detection",
	zeroShotObjectDetection: "zero-shot-object-detection",
	documentQuestionAnswering: "document-question-answering",
	imageToImage: "image-to-image",
	depthEstimation: "depth-estimation",
	featureExtraction: "feature-extraction",
} as const;

export type TransformerTask =
	(typeof TransformerTask)[keyof typeof TransformerTask];

export const DEFAULT_MODEL =
	"Xenova/distilbert-base-uncased-finetuned-sst-2-english";
export const DEFAULT_TASK: TransformerTask = TransformerTask.textClassification;

export const SummarisationModels = {
	modelIds: [
		"Xenova/bart-large-xsum",
		"Xenova/distilbart-xsum-9-6",
		"Xenova/distilbart-xsum-12-3",
		"Xenova/distilbart-xsum-6-6",
		"Xenova/distilbart-xsum-12-1",
		"ahmedaeb/distilbart-cnn-6-6-optimised",
		"Xenova/bart-large-cnn",
		"Xenova/distilbart-cnn-6-6",
		"Xenova/distilbart-cnn-12-3",
		"Xenova/distilbart-cnn-12-6",
		"Xenova/distilbart-xsum-12-6",
	],
	task: "summarization",
};

export enum Direction {
	ASCENDING = 1,
	DESCENDING = -1,
}

export const SortModels = {
	downloads: "downloads",
	createdAt: "createdAt",
	updatedAt: "updatedAt",
	author: "author",
} as const;

export type SortModels = (typeof SortModels)[keyof typeof SortModels];

export type GetModelsParams = {
	search?: string;
	author?: string;
	filter?: string;
	sort?: SortModels;
	direction?: Direction | "ascending" | "descending";
	limit?: number;
	full?: boolean;
	config?: boolean;
};

export type Model = {
	[key: string]: NodeValue;
	_id: string;
	id: string;
	likes: number;
	private: boolean;
	downloads: number;
	tags: string[];
	pipeline_tag?: string;
	createdAt: string;
	modelId: string;
};

export type FullModel = Model & {
	author: string;
	lastModified: string;
	sha: string;
	library_name: string;
	siblings: Sibling[];
};

export type Sibling = {
	rfilename: string;
};

export type ModelWithConfig = Model & {
	config: Config;
};

export type Config = {
	architectures?: string[];
	model_type?: string;
	task_specific_params?: TaskSpecificParams;
	auto_map?: AutoMap;
};

export type TaskSpecificParams = {
	"text-generation"?: TextGeneration;
	summarization?: Summarization;
	translation_en_to_de?: TranslationEnToDe;
	translation_en_to_fr?: TranslationEnToFr;
	translation_en_to_ro?: TranslationEnToRo;
};

export type TextGeneration = {
	do_sample: boolean;
	max_length: number;
	temperature?: number;
};

export type Summarization = {
	early_stopping: boolean;
	length_penalty: number;
	max_length: number;
	min_length: number;
	no_repeat_ngram_size: number;
	num_beams: number;
	prefix?: string;
};

export type TranslationEnToDe = {
	early_stopping: boolean;
	max_length: number;
	num_beams: number;
	prefix: string;
};

export type TranslationEnToFr = {
	early_stopping: boolean;
	max_length: number;
	num_beams: number;
	prefix: string;
};

export type TranslationEnToRo = {
	early_stopping?: boolean;
	max_length?: number;
	num_beams?: number;
	prefix?: string;
	decoder_start_token_id?: number;
};

export type AutoMap = {
	AutoConfig: string;
	AutoModel?: string;
	AutoModelForCausalLM?: string;
	AutoModelForQuestionAnswering?: string;
	AutoModelForSequenceClassification?: string;
	AutoModelForTokenClassification?: string;
	AutoModelForMaskedLM?: string;
};

export type summaryOutput = NodeValue;

export type summaryList = {
	summaries: NodeValue[];
};

export type pipelineBulkOutput = summaryList;

export type FullModelWithConfig = FullModel & ModelWithConfig;
export type ModelVariants =
	| Model
	| FullModel
	| ModelWithConfig
	| FullModelWithConfig;
