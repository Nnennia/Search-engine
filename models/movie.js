const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new mongoose.Schema({
	movieName: String,
	cinema: String,
	actorName: String,
	seatAvailable: Number,
	genre: String,
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
