const connectToRedis = require("../config/redis");
const elasticsearchClient = require("./elastic.search.handler");

async function searchMovie(query) {
	const cacheKey = `search:${query}`;

	try {
		const client = await connectToRedis();

		const cachedData = await client.get(cacheKey);
		if (cachedData) {
			console.log("Cache hit");
			return JSON.parse(cachedData);
		}

		const result = await elasticsearchClient.search({
			index: "movie",
			body: {
				query: {
					multi_match: {
						query,
						fields: ["movieName", "cinema", "actorName", "genre"],
					},
				},
			},
		});
		console.log("Elastic result:", result.hits.hits);
		const movies = result.hits.hits.map((hit) => hit._source);

		// Store result in Redis with 1-hour expiration
		await client.setEx(cacheKey, 3600, JSON.stringify(movies));

		console.log("Cache miss - Data stored in Redis");
		return movies;
	} catch (error) {
		console.error("Error searching movies:", error);
		throw error;
	}
}

module.exports = { searchMovie };
