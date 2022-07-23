import express from "express";
import cors from "cors";

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("^/$", (_, res) => {
	res.send("Hello world");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
