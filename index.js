const Movie = require("./models/Movie");
const client = require("./handler/elastic.search.handler");

const indexMovie = async (req, res) => {
	try {
		const movies = await Movie.find();

		for (const movie of movies) {
			await client.index({
				index: "movie",
				id: movie._id.toString(),
				body: {
					movieName: movie.movieName,
					cinema: movie.cinema,
					actorName: movie.actorName,
					seatAvailable: movie.seatAvailable,
					genre: movie.genre,
				},
			});
			console.log(`Indexed Movie: ${movie.movieName}`);
		}
		res.status(200).json({ message: "Movies indexed successfully!" });
	} catch (error) {
		console.error("Error indexing movies:", error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = { indexMovie };
