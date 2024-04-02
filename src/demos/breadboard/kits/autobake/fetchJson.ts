export async function fetchJson(url: string): Promise<unknown> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const jsonData = await response.json();

	return jsonData;
}

export default fetchJson;
