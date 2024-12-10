const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./config/db");
const searchRouter = require("./routes/search.route");
const indexRouter = require("./routes/index.routes");
require("dotenv").config();
const app = express();
PORT = process.env.PORT;
app.use(bodyParser.json());
app.use("/", searchRouter);
app.use("/", indexRouter);
app.use((err, req, res, nxt) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});
const server = () => {
	try {
		db();
		app.listen(PORT, () => {
			console.log(`Server is listening on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Error connecting to database:", error);
	}
};
server();
