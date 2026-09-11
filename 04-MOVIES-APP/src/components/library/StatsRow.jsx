import './StatsRow.css';

export function StatsRow({ counts, stats, genreName }) {
  return (
    <div className="stats-row">
      <div className="stats-row__card card">
        <p className="stats-row__label">Total Watched</p>
        <p className="stats-row__value">{counts.watched}</p>
      </div>
      <div className="stats-row__card card">
        <p className="stats-row__label">Watchlist</p>
        <p className="stats-row__value">{counts.watchlist}</p>
      </div>
      <div className="stats-row__card card">
        <p className="stats-row__label">Favorites</p>
        <p className="stats-row__value">{counts.favorites}</p>
      </div>
      <div className="stats-row__card card">
        <p className="stats-row__label">Avg User Rating</p>
        <p className="stats-row__value">{stats.avgRating.toFixed(1)} / 10</p>
      </div>
      <div className="stats-row__card card">
        <p className="stats-row__label">Top Genre</p>
        <p className="stats-row__value stats-row__value--text">{genreName || 'None yet'}</p>
      </div>
    </div>
  );
}
