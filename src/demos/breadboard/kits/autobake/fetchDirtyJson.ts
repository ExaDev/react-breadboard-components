export async function fetchDirtyJson(
	url: string,
	excessString: string
): Promise<unknown> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	let data = await response.text();
	if (data.startsWith(excessString)) {
		data = data.substring(excessString.length);
	}

	const jsonData = JSON.parse(data);

	return jsonData;
}

export default fetchDirtyJson;
