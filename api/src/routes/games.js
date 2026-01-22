import express from "express";

export function makeGamesRouter(queries) {
    const router = express.Router();

    // GET /list  and  /list?search=...
    router.get("/list", (req, res) => {
        try {
            const search = String(req.query.search ?? "").trim();
            const rows = search ? queries.searchGames(search) : queries.listGames();
            res.json({ ok: true, count: rows.length, rows });
        } catch (e) {
            res.status(500).json({ ok: false, error: String(e?.message ?? e) });
        }
    });

    return router;
}
