import { ftsAnyWord, tokenize } from "../utils/text.js";

const scoreThreshold = 200;
const spellFixScope = 2;

export function makeQueries(db) {
  const listStmt = db.prepare(`
    SELECT * FROM games
    ORDER BY id DESC
    LIMIT 50
  `);
  const spellSuggestStmt = db.prepare(`
    SELECT word, score
    FROM title_spell
    WHERE word MATCH ?
    AND scope = ${spellFixScope}
    ORDER BY score
    LIMIT 1
  `);
  const ftsSearchStmt = db.prepare(`
    SELECT g.*, bm25(games_title_fts_tri) AS rank
    FROM games_title_fts_tri
    JOIN games g ON g.id = games_title_fts_tri.rowid
    WHERE games_title_fts_tri MATCH ?
    ORDER BY rank
    LIMIT 50
  `);

  function ftsSearch(query) {
    const matchExpr = ftsAnyWord(query);
    if (!matchExpr) return [];

    return ftsSearchStmt.all(matchExpr);
  }

  function correctQuery(query) {
    const tokens = tokenize(query);
    const correctedTokens = [];

    for (const t of tokens) {
      if (t.length < 3) {
        correctedTokens.push(t);
        continue;
      }

      const suggestion = spellSuggestStmt.get(t);

      if (!suggestion?.word) {
        correctedTokens.push(t);
        continue;
      }

      const corrected = String(suggestion.word);
      const score = suggestion.score;

      const tooDifferent =
        (Math.abs(corrected.length - t.length) >= 4) ||
        score > scoreThreshold;
      correctedTokens.push(tooDifferent ? t : corrected);
    }

    return correctedTokens.join(" ");
  }

  function correctedSearch(query) {
    if (!query.trim()) return [];

    const correctedString = correctQuery(query);

    return ftsSearch(correctedString);
  }

  return {
    listGames() {
      return listStmt.all();
    },

    searchGames(search, exact = false) {
      let matches = ftsSearch(search);
      if (!exact && matches.length == 0) {
        matches = correctedSearch(search);
      }
      return matches;
    }
  };
}
