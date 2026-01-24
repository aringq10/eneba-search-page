import { useEffect, useState } from "react";
import FavIcon from "../assets/fav.svg?react";
import CartIcon from "../assets/cart.svg?react";
import ProfileIcon from "../assets/profile.svg?react";
import SearchIcon from "../assets/search.svg?react";
import ClearIcon from "../assets/cross.svg?react";

import "./navbar.scss";

const navbarBreakpoint = "768px";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () =>
      m.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export default function NavBar({ query, onSubmit, setQuery, open, setOpen }) {
  const mobile = useMediaQuery(`(max-width: ${navbarBreakpoint})`);

  useEffect(() => {
    if (open) setOpen(false);
  }, [mobile]);


  return (
    <div id="navbar">
      <div className="page-overlay" style={{display: open ? 'block' : 'none'}}></div>
      <a id="navbar-logo" href="/">
        <img src="https://static.eneba.games/branding/v2/logoFull.svg"></img>
      </a>
      <form onSubmit={onSubmit} id="searchbar" autoComplete="off"
        className={open ? "open" : ""}
      >
        <label
          id="search-icon"
          htmlFor="searchfield"
          onClick={() => mobile ? setOpen((v) => !v) : ""}
        >
          <SearchIcon className="navbar-icon" />
        </label>
        <input
          id="searchfield"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Games..."
          aria-label="Search"
        />
        <div
          id="clear-icon"
          style={{display: query && ((mobile && open) || !mobile) ? "flex" : "none"}}
          onClick={() => setQuery("")}
        >
          <ClearIcon className="navbar-icon" />
        </div>
      </form>
      <FavIcon id="fav-icon" className="navbar-icon" />
      <CartIcon id="cart-icon" className="navbar-icon" />
      <ProfileIcon id="profile-icon" className="navbar-icon" />
    </div>
  );
}
