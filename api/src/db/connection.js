import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

import games from "#root/db/seed.json" with { type: "json" };

const schemaPath = "db/schema.sql";
const seedArray = games;
const otherPaths = [
    "db/search.sql"
]

export function execSqlFile(db, filename) {
    const sql = fs.readFileSync(filename, "utf8");
    db.exec(sql);
}

export function openDb(dbFile = "app.db") {
    const db = new Database(dbFile);

    db.pragma('journal_mode = WAL');
    db.loadExtension('./sqlite_ext/spellfix.so')

    try {
        db.transaction(() => {
            execSqlFile(db, path.resolve(schemaPath));
            const insert = db.prepare(`
              INSERT INTO games
              (title, platform, region, price, discount,
              dprice, cashback, favcount, cover)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
            );

            const count = db.prepare("SELECT COUNT(*) AS n FROM games").get().n;
            if (count === 0) {
                for (const i of seedArray) {
                  insert.run(
                    i.title,
                    i.platform,
                    i.region,
                    i.price,
                    i.discount,
                    i.dprice,
                    i.cashback,
                    i.favcount,
                    i.cover
                  );
                }
            }

            for (const p of otherPaths) {
                execSqlFile(db, path.resolve(p));
            }
        })();

        console.log("DB initialized.");
    } catch (err) {
        console.log(err?.message ?? err);
    }

    return db;
}

