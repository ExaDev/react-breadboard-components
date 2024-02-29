export type BreadboardEmbedProps = {
	url: string;
};
export function BreadboardEmbed({ url }: BreadboardEmbedProps) {
	return <div >{url}</div>;
};
export default BreadboardEmbed;
