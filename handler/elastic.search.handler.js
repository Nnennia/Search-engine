require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
	node: process.env.PORTCLIENT,
	auth: {
		apiKey: process.env.APIKEY,
	},
});
async function createIndex() {
	const indexExists = await client.indices.exists({ index: "movie" });
	if (!indexExists) {
		await client.indices.create({
			index: "movie",
			body: {
				mappings: {
					properties: {
						movieName: String,
						cinema: String,
						actorName: String,
						seatAvailable: Number,
						genre: String,
					},
				},
			},
		});
		console.log("Index created");
	} else {
		console.log("Index already exists");
	}
}
createIndex().catch(console.error);
module.exports = client;
