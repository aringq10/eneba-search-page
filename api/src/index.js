import express from "express";
import { openDb } from "./db/connection.js";
import { makeQueries } from "./db/queries.js";
import { makeGamesRouter } from "./routes/games.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 9000;
const relPublicPath = "../../web/public";

const app = express();
app.use(express.json());

const db = openDb("app.db");
const queries = makeQueries(db);

app.use("/", makeGamesRouter(queries));

const here = path.dirname(fileURLToPath(import.meta.url));
app.use('/static', express.static(path.resolve(here, relPublicPath)));

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
