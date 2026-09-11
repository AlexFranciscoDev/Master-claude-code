import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLibrary } from '../../hooks/useLibrary';
import './Header.css';

export function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { counts } = useLibrary();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          CineVault
        </Link>

        <form className="header__search" onSubmit={handleSubmit} role="search">
          <label htmlFor="site-search" className="visually-hidden">
            Search movies by title
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="Search movies by title…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="header__search-btn" aria-label="Search">
            🔍
          </button>
        </form>

        <nav className="header__nav" aria-label="Primary">
          <Link to="/">Discover</Link>
          <Link to="/?scope=trending">Trending</Link>
          <Link to="/watchlist">Watchlist ({counts.watchlist})</Link>
          <Link to="/watched">Watched ({counts.watched})</Link>
          <Link to="/favorites">Favorites ({counts.favorites})</Link>
        </nav>

        <span className="header__status">
          <span className="header__status-dot" aria-hidden="true" /> TMDB API Online
        </span>
      </div>
    </header>
  );
}
