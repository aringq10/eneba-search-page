import express from "express";
import { openDb } from "./db/connection.js";
import { makeQueries } from "./db/queries.js";
import { makeGamesRouter } from "./routes/games.js";

const app = express();
app.use(express.json());

const db = openDb("app.db");
const queries = makeQueries(db);

app.use("/", makeGamesRouter(queries));

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
