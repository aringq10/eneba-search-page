import express from "express";
import { openDb } from "./db/connection.js";
import { makeQueries } from "./db/queries.js";
import { makeGamesRouter } from "./routes/games.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 9000;
const relPagePath = "../../web/dist/";
const here = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

const db = openDb("app.db");
const queries = makeQueries(db);

app.use("/", makeGamesRouter(queries));

app.use('/', express.static(path.resolve(here, relPagePath)));

app.listen(process.env.PORT || PORT, () => console.log(`Listening on http://localhost:${PORT}`));
