export default function NavBar({ query, onSubmit, setQuery, loading }) {
  return (
    <div id="navbar">
      <form onSubmit={onSubmit} id="searchbar">
        <input
          id="searchfield"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          aria-label="Search"
        />
        <button id="searchbtn" type="submit" disabled={loading}>
          Search
        </button>
      </form>
    </div>
  );
}
