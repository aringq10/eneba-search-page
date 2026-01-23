import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from '../shared/NavBar.jsx'
import ResultList from "../shared/ResultList.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newQuery = params.get("search") ?? "";
    setQuery(newQuery);
    queryGame(newQuery);
  }, [params]);

  async function queryGame(query) {
    const q = query.trim();

    setLoading(true);
    setError("");

    try {
      const url = q ? `/api/list?search=${encodeURIComponent(q)}` : "/api/list";

      const res = await fetch(url, { method: "GET" });

      if (!res.ok) {
        throw new Error(`Request failed (HTTP ${res.status})`);
      }

      const data = await res.json();

      if (!Array.isArray(data.rows)) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (open) setOpen(false);
    setParams(query ? { search: query } : {});
  }

  return (
    <div
      id="page"
      className={open ? "no-scroll" : ""}
    >
      <NavBar
        query={query}
        onSubmit={handleSubmit}
        setQuery={setQuery}
        open={open}
        setOpen={setOpen}
      />
      <ResultList
        items={items}
        loading={loading}
        error={error}
      />
    </div>
  );
}
