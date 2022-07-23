import express from "express";
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("^/$", (_, res) => {
	res.send("Hello world");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
