import './StatusBadge.css';

const LABELS = {
  watched: 'Watched',
  watchlist: 'Watchlist',
  favorite: 'Favorite',
};

export function StatusBadge({ status }) {
  return <span className={`status-badge status-badge--${status}`}>{LABELS[status]}</span>;
}
