import fetchJson from "./fetchJson.js";

export const versionsUrl = "https://chromestatus.com/omaha_data";
export type Channel = "stable" | "beta" | "dev";

// text utility type for version number
export type VersionNumber = `${number}.${number}.${number}.${number}`;
export type Version = {
	channel: Channel;
	version: VersionNumber;
};

export type Versions = {
	versions: Version[];
}[];

export async function chromeVersions() {
	const versions: Versions = (await fetchJson(versionsUrl)) as Versions;
	console.log("AYOOOOOOOOOOOOOOOOO")
	// key versions by channel and return object with channel keys
	return versions[0].versions.reduce((acc, version) => {
		acc[version.channel] = version.version;
		return acc;
	}, {} as Record<Channel, VersionNumber>);
}

export default chromeVersions;