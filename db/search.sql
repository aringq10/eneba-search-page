-- fuzzy matching
CREATE VIRTUAL TABLE IF NOT EXISTS games_title_fts_tri USING fts5(
  title, content='games', content_rowid='id', tokenize='trigram'
);

-- vocab + “normal” matching
CREATE VIRTUAL TABLE IF NOT EXISTS games_title_fts_word USING fts5(
  title, content='games', content_rowid='id', tokenize='unicode61'
);

INSERT INTO games_title_fts_tri(games_title_fts_tri) VALUES('rebuild');
INSERT INTO games_title_fts_word(games_title_fts_word) VALUES('rebuild');

CREATE VIRTUAL TABLE IF NOT EXISTS games_title_vocab USING fts5vocab(games_title_fts_word, 'row');
CREATE VIRTUAL TABLE IF NOT EXISTS title_spell USING spellfix1;

DELETE FROM title_spell;
INSERT INTO title_spell(word)
SELECT term FROM games_title_vocab WHERE length(term) >= 3;
