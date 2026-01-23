CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    platform TEXT,
    region TEXT,
    price REAL,
    discount INTEGER,
    dprice REAL,
    cashback REAL,
    favcount INTEGER,
    cover TEXT
);
