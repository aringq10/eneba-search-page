export function tokenize(q) {
    return String(q ?? "").toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

export function ftsAnyWord(userInput) {
    const tokens = String(userInput ?? "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (tokens.length === 0) return "";

    return tokens
        .map(t => `"${t.replace(/"/g, '""')}"`)
        .join(" OR ");
}
