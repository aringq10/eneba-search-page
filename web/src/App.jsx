import { useState } from "react";
import NavBar from './NavBar.jsx'
import ResultList from "./ResultList.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const q = query.trim();

    setLoading(true);
    setError("");

    try {
      const url = `/list?search=${encodeURIComponent(q)}`;
      const res = await fetch(url, { method: "GET" });

      if (!res.ok) {
        throw new Error(`Request failed (HTTP ${res.status})`);
      }

      const data = await res.json();

      // Expected: data is an array. If your API returns {results:[...]} adjust here.
      if (!Array.isArray(data.rows)) {
        console.log(data.rows);
        throw new Error("Unexpected response format (expected JSON array).");
      }

      setItems(data.rows);
    } catch (err) {
      setItems([]);
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="page">
      <NavBar
        query={query}
        onSubmit={handleSubmit}
        setQuery={setQuery}
        loading={loading}
      />
      <ResultList
        items={items}
        loading={loading}
      />
    </div>
  );
}
