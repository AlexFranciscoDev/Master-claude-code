import './LibraryTabs.css';

const TABS = [
  { key: 'watched', label: 'Watched' },
  { key: 'watchlist', label: 'Watchlist' },
  { key: 'favorites', label: 'Favorites' },
];

export function LibraryTabs({ activeTab, counts, onSelect }) {
  return (
    <div className="library-tabs" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.key}
          className={`library-tabs__tab ${activeTab === tab.key ? 'is-active' : ''}`}
          onClick={() => onSelect(tab.key)}
        >
          {tab.label} ({counts[tab.key]})
        </button>
      ))}
    </div>
  );
}
